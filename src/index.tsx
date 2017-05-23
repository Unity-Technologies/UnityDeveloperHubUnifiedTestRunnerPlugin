import * as React from "react";
import * as ReactDOM from "react-dom";
declare var module: { hot: any };
require('file-loader?name=[name].[ext]!../index.html');
require('./assets/styles/styles.scss');

// tslint:disable
const { AppContainer } = require("react-hot-loader");
if (module.hot) {
    require("react-hot-loader/patch")
}
// tslint:enable

// Global style

import { App } from "./app/app.component";

const render = (Component: any) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        // HTML root element for React app
        document.getElementById("react-root")
    );
};

render(App);

// Hot module reloading

if (module.hot) {
  module.hot.accept('./app/app.component', () => {
    const NextApp = require("./app/app.component").default;
    render(NextApp);
  });
}
