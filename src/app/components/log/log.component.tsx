import * as React from "react";
import ShadowDOM from 'react-shadow';

export interface LogProps { 
}

export class Log extends React.Component<LogProps, {}> {
    public style: any = require('./log.component.scss').toString();

    render() {
        return (
            <ShadowDOM>
                <div>
                    <style>{this.style}</style>
                    <p>
                        LOG OUTPUT COMES HERE
                    </p>
                </div>
            </ShadowDOM>
        );
    }
}
