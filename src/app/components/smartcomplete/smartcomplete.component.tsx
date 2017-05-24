import React = require('react');
import ReactDOM = require('react-dom');
import Autosuggest = require('react-autosuggest');
import ShadowDOM from 'react-shadow';
import { CommandLine } from "./../../CommandLine";
import { Search } from "./../../Search"
import { Utr } from "./../../Utr"

var match = require('autosuggest-highlight/match');
var parse = require('autosuggest-highlight/parse');

interface SmartCompleteProps {
    commands: CommandLine[],
    commandSelectedCallBack: any,
    renderingParamsCompletions?: boolean,
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
            searchedKeywords: [],
            renderingParamsCompletions: false
        };
    }
    private keyDown(event: React.FormEvent<any>) {
        const keyboardEvent = event.nativeEvent as KeyboardEvent;
        if (keyboardEvent != null && keyboardEvent.ctrlKey && keyboardEvent.keyCode == 32) {
            Utr.complete(this.state.value, this.completionsAvalaibe.bind(this)); 
        }
    }

    private completionsAvalaibe(complettions: Array<string>): void {
        const suggestions : CommandLine[] = new Array<CommandLine>();
        complettions.forEach(c => {
            suggestions.push({cmd: `${c}`} )
        });
        this.setState({
            suggestions: suggestions,
            renderingParamsCompletions: true
        });
    }

    render(): JSX.Element {
        const {value, suggestions} = this.state;
        const inputProps = {
            placeholder: `Type what you remember: 'native', 'integration', 'physics'. Select the command and hit enter`,
            value,
            onKeyDown: this.keyDown.bind(this),
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

    protected onSuggestionsSelected(event: React.FormEvent<any>, data: Autosuggest.SuggestionSelectedEventData<CommandLine>): void {
        if (this.state.renderingParamsCompletions) {
            console.log('renderingParamsCompletions is true ' + this.state.value);
            this.props.commandSelectedCallBack.onCommandSelected(this.state.value + ' ' + data.suggestion.cmd);
            this.setState ({
                value: this.adjustCompletionValueForInput(this.state.value, data.suggestion.cmd),
                renderingParamsCompletions: false
            });
        } else {
            this.props.commandSelectedCallBack.onCommandSelected(data.suggestion.cmd);
        }   
    }

    protected adjustCompletionValueForInput(value: string, completion: string) : string {
        var result = value;
        var parts = result.split(' ');
        parts.pop();

        return parts.join(' ') + ' ' + completion;
    }

    protected onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }

    protected renderSuggestion(suggestion: CommandLine): JSX.Element {
        const keywords = this.state.searchedKeywords;
        var matches = match(suggestion.cmd, keywords.join(' '));
        var parts = parse(suggestion.cmd, matches);
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
 
    protected getSuggestions(value: string): CommandLine[] {
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

    protected getSuggestionValue(suggestion: CommandLine): string { return suggestion.cmd; }
}
