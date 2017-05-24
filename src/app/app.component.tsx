import * as React from "react";
import ShadowDOM from 'react-shadow';
import AutoSuggest = require("react-autosuggest");
import { CommandLine } from "./CommandLine";
import { SmartComplete } from "./components/smartcomplete/smartcomplete.component";
import { Log } from "./components/log/log.component";
import { Utr } from "./Utr";

const commads :CommandLine[] = require('./data.json');

export class App extends React.Component<any, {}> {
    public style: any = require('./app.component.scss').toString();

    private onUtrStdOut(stdout: string) {
        console.log(stdout);
    }

    private onUtrStdErr(stderr: string) {
        console.error(stderr);
    }
 
    private onCommandSelected(cmd: string) : void {
        console.log('Selected ' + cmd);
        const utr = new Utr ("~/unity/lane1", this.onUtrStdOut, this.onUtrStdErr);
        utr.complete(cmd, App.autoCompletionDone);
        //utr.run(cmd);
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
                    <SmartComplete commands={commads} commandSelectedCallBack={this.onCommandSelected} />
                    <Log />
                </div>
            </ShadowDOM>
        );
    }
}
