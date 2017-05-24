import * as React from "react";
import ShadowDOM from 'react-shadow';
import AutoSuggest = require("react-autosuggest");
import { CommandLine } from "./CommandLine";
import { SmartComplete } from "./components/smartcomplete/smartcomplete.component";
import { Log } from "./components/log/log.component";
import { Utr } from "./Utr";
import { AppSettings } from "./AppSettings";

const commands :CommandLine[] = require('./data.json');

function onUtrStdOut(stdout: string) {
    console.log(stdout);
}

function onUtrStdErr(stderr: string) {
    console.error(stderr);
}

export class App extends React.Component<any, {}> {
    public style: any = require('./app.component.scss').toString();
    private _log: Log;

    private onCommandSelected(cmd: string) : void {
        console.log('Selected ' + cmd);
        const utr = new Utr (AppSettings.repositoryRoot, (data) => {
            this._log.append (data);
        }, onUtrStdErr);
        utr.run(cmd);
    }

    private static autoCompletionDone (data: Array<string>){
        console.log('hello');
        console.log (data);
    }

    render() {
        return (
            <ShadowDOM>
                <div>
                    <style>{this.style}</style>
                    <SmartComplete commands={commands} commandSelectedCallBack={this} />
                    <Log ref={(c) => this._log = c}/>
                </div>
            </ShadowDOM>
        );
    }
}
