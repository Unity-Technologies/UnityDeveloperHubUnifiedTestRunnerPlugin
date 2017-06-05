import * as React from "react";
import ShadowDOM from 'react-shadow';
import { LogUtils, PartType } from './log.utils'
export interface LogProps {
};

export interface LogState {
    lines: string[];
};


function LogMessages(props) {
    const lines = props.lines;
    return (
        <div>
            {
                lines.map((line, index) => {
                     
                    return (
                            <div>
                            {
                                LogUtils.split(line).map(p => {
                                    switch(p.type){
                                        case PartType.FilePath:
                                            return <span><a target="blank" href={p.value}>{p.value}</a></span>
                                        case PartType.LineBreak:
                                            return <br />
                                        default:
                                            return <span>{p.value}</span>
                                    }
                                })
                            }
                            </div>
                        )
                })
            }
        </div>
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
