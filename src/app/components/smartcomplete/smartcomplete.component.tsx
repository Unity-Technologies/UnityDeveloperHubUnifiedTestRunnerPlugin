import React = require('react');
import ReactDOM = require('react-dom');
import Autosuggest = require('react-autosuggest');
import ShadowDOM from 'react-shadow';
import { CommandLine } from "./../../CommandLine";
import { Search } from "./../../Search"
import { Utr } from "./../../Utr"

var match = require('autosuggest-highlight/match');
var parse = require('autosuggest-highlight/parse');


interface CommandSelectedCallback { (data: string): void }

interface SmartCompleteProps {
    commands: CommandLine[],
    commandSelectedCallBack: CommandSelectedCallback,
}

interface SmartCompleteState {
    value: string
    suggestions: CommandLine[]
    searchedKeywords: string[]
    renderingParamsCompletions: boolean
    selectedSuggestion: CommandLine
}

function escapeRegexCharacters(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export class SmartComplete extends React.Component<SmartCompleteProps, SmartCompleteState> {
    public style: any = require('./smartcomplete.component.scss').toString();
    constructor(props: SmartCompleteProps) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
            searchedKeywords: [],
            renderingParamsCompletions: false,
            selectedSuggestion: null
        };
    }
    private keyDown(event: React.FormEvent<any>) {
        const keyboardEvent = event.nativeEvent as KeyboardEvent;
        if (keyboardEvent == null) {
            return;
        }
        
        if (keyboardEvent.keyCode == 13) {
            this.props.commandSelectedCallBack(this.state.value);
            return;
        }

        if (keyboardEvent.ctrlKey && keyboardEvent.keyCode == 32) {
            Utr.complete(this.state.value, this.completionsAvalaibe.bind(this));
        }
    }

    private completionsAvalaibe(completions: Array<string>): void {
        const suggestions: CommandLine[] = new Array<CommandLine>();
        completions.forEach(c => {
            suggestions.push({ cmd: this.adjustCompletionValueForInput(this.state.value, c) })
        });
        this.setState({
            suggestions: suggestions,
            renderingParamsCompletions: true
        });
    }

    render(): JSX.Element {
        const { value, suggestions } = this.state;
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
        this.setState ({
            selectedSuggestion: data.suggestion
        });
    }

    protected getSelectedCommandText() : string {
         if (this.state.renderingParamsCompletions) {
              return `${this.state.value}  ${this.state.selectedSuggestion.cmd}`;
         }
         return this.state.selectedSuggestion.cmd;
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

    protected onChange(event: React.FormEvent<any>, { newValue, method }: any): void {
        this.setState({ value: newValue });
    }

    protected onSuggestionsFetchRequested({ value }: any): void {
        this.getSuggestions(value, (err, data) => {
            this.setState({
                suggestions: data,
                selectedSuggestion: null
            });
        });
    }

    protected getSuggestions(value: string, callback: any): CommandLine[] {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }
        const keywords = escapedValue.split(' ');
        this.setState({
            searchedKeywords: keywords
        });
        Search.suggest({
            data: this.props.commands,
            keywords: keywords
        }, callback);
    }

    protected adjustCompletionValueForInput(value: string, completion: string): string {
        var parts = value.split(' ');
        if (!value.endsWith('=')) {
            parts.pop();
            return parts.join(' ') + ' ' + completion;
        }
        return parts.join(' ') + completion;
    }


    protected getSuggestionValue(suggestion: CommandLine): string { return suggestion.cmd; }
}
