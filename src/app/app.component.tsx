import * as React from "react";
import ShadowDOM from 'react-shadow';

// Core components
import { Hello } from "./components/hello/hello.component";

export class App extends React.Component<any, {}> {
    public style: any = require('./app.component.scss').toString();

    render() {
        return (
            <ShadowDOM>
                <div>
                    <style>{this.style}</style>
                    <Hello target="World"/>
                </div>
            </ShadowDOM>
        );
    }
}
