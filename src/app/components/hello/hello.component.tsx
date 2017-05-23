import * as React from "react";
import ShadowDOM from 'react-shadow';

export interface HelloProps { 
    target: string; 
}

export class Hello extends React.Component<HelloProps, {}> {
    public style: any = require('./hello.component.scss').toString();
    render() {
        return (
            <ShadowDOM>
                <div>
                    <style>{this.style}</style>
                    <h1>Hello {this.props.target}!</h1>
                    <p>
                        This app is made with <b>Webpack</b>, <b>Typescript</b>, <b>React</b>, <b>Sass</b>, <b>ShadowDOM</b>
                    </p>
                </div>
            </ShadowDOM>
        );
    }
}
