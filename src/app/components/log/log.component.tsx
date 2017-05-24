import * as React from "react";
import ShadowDOM from 'react-shadow';

export interface LogProps {
};

export interface LogState {
    content: string;
};

export class Log extends React.Component<LogProps, LogState> {
    public style: any = require('./log.component.scss').toString();

    constructor (props : LogProps) {
        super(props);

        this.state = {
            content: "",
        };
    }

    public append(line:string):void {
        this.setState ({
            content: this.state.content + line
        });
    }

    render() {
        return (
            <ShadowDOM>
                <div>
                    <style>{this.style}</style>
                    {this.state.content}
                </div>
            </ShadowDOM>
        );
    }
}
