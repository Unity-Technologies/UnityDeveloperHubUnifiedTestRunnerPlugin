import React = require('react');
import ReactDOM = require('react-dom');
import Autosuggest = require('react-autosuggest');
import ShadowDOM from 'react-shadow';
import { CommandLine } from "./../../CommandLine";
import { Search } from "./../../Search"
var match = require('autosuggest-highlight/match');
var parse = require('autosuggest-highlight/parse');

export interface CommandSelectedCallback { (data: string) : void }

interface SmartCompleteProps {
    commands: CommandLine[]
    commandSelectedCallBack: CommandSelectedCallback
}

function escapeRegexCharacters(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export class SmartComplete extends React.Component<SmartCompleteProps, any> {
    public style: any = require('./smartcomplete.component.scss').toString();
    constructor(props: SmartCompleteProps) {
        super(props);
       
        this.state = {
            value: '',
            suggestions: this.getSuggestions(''),
            searchedKeywords: []
        };
    }
 
    render(): JSX.Element {
        const {value, suggestions} = this.state;
        const inputProps = {
            placeholder: `Type what you remember: 'native', 'integration', 'physics'. Select the command and hit enter`,
            value,
            autoFocus: true,
            onChange: this
                .onChange
                .bind(this)
        };

        return <ShadowDOM>
                <div> 
                    <style>{this.style}</style>
                    <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion.bind(this)}
                    onSuggestionSelected={this.onSuggestionsSelected.bind(this)}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                    inputProps={inputProps}
                    />
                    </div>
            </ShadowDOM>
    }

    protected onSuggestionsSelected(event: React.FormEvent<any>, data: Autosuggest.SuggestionSelectedEventData<string>): void {
        this.props.commandSelectedCallBack(data.suggestion);
    }

    protected onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }

    protected renderSuggestion(suggestion: string): JSX.Element {
        const keywords = this.state.searchedKeywords;
        var matches = match(suggestion, keywords.join(' '));
        var parts = parse(suggestion, matches);
        return (
                <span className={'suggestion-content'}>
                    <span className="name">
                    {
                        parts.map((part, index) => {
                            const className = part.highlight ? 'highlight' : null;
                            return (
                                <span className={className} key={index}>{part.text}</span>
                            );
                        })
                    }
                    </span>
                </span>
        );
    }

    protected onChange(event: React.FormEvent<any>, {newValue, method}: any): void {
        this.setState({value: newValue});
    }

    protected onSuggestionsFetchRequested({value}: any): void {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }
 
    protected getSuggestions(value: string): string[] {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }
        const keywords = escapedValue.split(' ');
        var result = Search.suggest({
            data: this.props.commands,
            keywords: keywords
        });
        this.setState({
            searchedKeywords: keywords
        });
        return result;
    }

    protected getSuggestionValue(suggestion: string): string { return suggestion; }
}