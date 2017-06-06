import * as React from "react";
import ShadowDOM from 'react-shadow';
import { CommandLine } from "./CommandLine";
import { SmartComplete } from "./components/smartcomplete/smartcomplete.component";
import { Log } from "./components/log/log.component";
import { Utr } from "./Utr";
import { AppSettings } from "./AppSettings";
import * as child_process from 'child_process';

export class App extends React.Component<any, {}> {
    public style: any = require('./app.component.scss').toString();
    private _log: Log;

    private onCommandSelected(cmd: string) : void {
        const utr = new Utr(AppSettings.repositoryRoot, child_process.spawn);
        utr.run(cmd, 
            this.onUtrStdOut.bind(this),
            this.onUtrStdErr.bind(this)
        );
    }

    private onUtrStdOut(data: string) {
        this._log.append (data);
    }

    private onUtrStdErr(data: string) {
        this._log.append (data);
    }

    render() {
        return (
            <ShadowDOM>
                <div>
                    <style>{this.style}</style>
                    <SmartComplete 
                        commandSelectedCallBack={this.onCommandSelected.bind(this)} 
                    />
                    <Log ref={(c) => this._log = c}/>
                </div>
            </ShadowDOM>
        );
    }
}
