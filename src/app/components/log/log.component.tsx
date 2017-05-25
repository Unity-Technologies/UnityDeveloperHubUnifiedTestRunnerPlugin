import * as React from "react";
import ShadowDOM from 'react-shadow';

export interface LogProps {
};

export interface LogState {
    lines: string[];
};

function LogMessages(props) {
  const lines = props.lines;

  return (
            <ul className={'suggestion-content'}>
                <li >
                    {
                        lines.map((line, index) => {
                            const regex = /((?:[a-zA-Z]\:){0,1}(?:[\\/][\w.]+){1,})/g;
                            line = line.replace (regex, '<a href="file://$1">$1</a>');
                            line = line.replace (/\n/g, '<br/>');
                            return (
                                <div dangerouslySetInnerHTML={{__html: line}}></div>
                            );
                        })
                    }
                </li>
            </ul>
    );
}

export class Log extends React.Component<LogProps, LogState> {
    public style: any = require('./log.component.scss').toString();

    constructor (props : LogProps) {
        super(props);

        this.state = {
            lines: [],
        };
    }

    public append(line:string):void {
        // TODO: find more effective way to do this
        const lines = this.state.lines;
        lines.push(line);
        this.setState ({
            lines: lines
        });
    }

    render() {
        return (
            <ShadowDOM>
                <div>
                    <style>{this.style}</style>
                    <LogMessages lines={this.state.lines}/>
                </div>
            </ShadowDOM>
        );
    }
}
