import * as React from "react";
import ShadowDOM from 'react-shadow';
import { LogUtils } from './log.utils'
export interface LogProps {
};

export interface LogState {
    lines: string[];
};

function LogMessages(props) {
    const lines = props.lines;
    return (
        <ul>
            {
                lines.map((line, index) => {
                        return (
                            <li>
                            {
                                LogUtils.split(line).map(p => {
                                    let element = <span>{p.value}</span>
                                    if (p.isFileName) {
                                        element = <span><a target="blank" href={p.value}>{p.value}</a></span>
                                    }
                                    return (
                                        element
                                    );
                                })
                            }
                            </li>
                        )
                })
            }
        </ul>
    );
}

export class Log extends React.Component<LogProps, LogState> {
    public style: any = require('./log.component.scss').toString();

    constructor(props: LogProps) {
        super(props);

        this.state = {
            lines: [],
        };
    }

    public append(line: string): void {
        // TODO: find more effective way to do this
        const lines = this.state.lines;
        lines.push(line);
        this.setState({
            lines: lines
        });
    }

    render() {
        return (
            <ShadowDOM>
                <div>
                    <style>{this.style}</style>
                    <LogMessages lines={this.state.lines} />
                </div>
            </ShadowDOM>
        );
    }
}
