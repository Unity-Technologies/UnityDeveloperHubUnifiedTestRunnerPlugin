# Unity Developer Hub - Plugin Starter kit

UDH - Plugin starter kit is an opinionated boilerplate for web/app development build on top of [React](https://facebook.github.io/react/), containing modern web development
tools such as [Webpack](http://webpack.github.io/), [Typescript](https://www.typescriptlang.org/index.html) and [SASS](http://sass-lang.com/), helping you get get started quickly with modern web technologies.

!NB - This starter kit is in a very early stage, and the webpack configuration will change heavily, but it works very well for development of plugins.

## Getting Started

### Requirements

* Mac OS X, Windows, or Linux
* [Yarn](https://yarnpkg.com/) package + [Node.js](https://nodejs.org/) v7.8 or newer 
* Text editor or IDE pre-configured with Typescript/SCSS/React/JSX/ESlint (webstorm/Visual code is pre-configured)

### Directrory layout


```
.
├── /dist/                                              # The folder for compiled output
├── /tests/                                             # The folder for test related files
│   └── /__mocks__/                                     # The folder for test mock files
│       ├── fileMock.js                                 # Mock file for files
│       └── styleMock.js                                # Mock file for SCSS file
├── /node_modules/                                      # 3rd-party libraries and utilities
├── /src/                                               # The source code of the application
│   ├── /app/                                           # Folder of app content
│       ├── /components/                                # React components
│           └── /component/                             # A React component
│               ├── /__tests__/                         # Folder for test for specific React component
│                   └── component.component.spec.tsx    # A React component test written in Jest
│               ├── component.component.scss            # A React component style
│               └── component.component.tsx             # A React component
│       ├── app.component.scss                          # React root component style
│       ├── app.component.tsx                           # React root component
│   ├── /assets/                                        # Folder for static assets and global styling and sass mixins + function etc..
│   ├── /typings/                                       # Folder for custom [type declerations](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
│   └── /index.html                                     # Index.html are copied into the /dist folder on build
├── tsconfig.json                                       # Typescript configuration file
├── package.json                                        # The list of 3rd party libraries and utilities
├── webpack.dev.js                                      # Webpack configuration file for development
├── webpack.prod.js                                     # Webpack configuration file for production build
└── yarn.lock                                           # Fixed versions of all the dependencies
```

**Note**: The current version if the Plugin Starter Kit does not contain a FLUX library like [redux](https://github.com/reactjs/redux) or [NGRXStore](https://github.com/ngrx/store). You can implement any of your choice but we recommend Redux.

### Quick Start

You can start by cloning the latest Plugin Starter Kit (PSK) to your local machine by running:
```shell
$ git clone git@github.com:Unity-Technologies/UnityDeveloperHubPluginStarterKit.git MyApp
$ cd MyApp
```

#### 1. Run `yarn install`

This will install both run-time project dependencies and developer tools listed
in [package.json](./package.json) file.

#### 2.1 Development (Web app)
To start a local development environment run:

```shell
$ yarn start
```

This command will build the app from the source files (`/src`) into the output
`/dist` folder. As soon as the initial build completes, it will start a local development server with [HMR](https://webpack.github.io/docs/hot-module-replacement) on top of it.
> [http://localhost:8080/](http://localhost:8080/) — Webpack-dev-server with HMR, React Hot Transform

Now you can open your web app in a browser, on mobile devices and start
hacking. Whenever you modify any of the source files inside the `/src` folder,
the module bundler ([Webpack](http://webpack.github.io/)) will recompile the
app on the fly and refresh all the connected browsers.

#### 2.2 Development (electron renderer app)
To start a local development environment for electron run:

```shell
$ yarn run start:electron
```

To run it in the [Unity Dev Helper](https://github.com/Unity-Technologies/UnityDevHelper), run `yarn run start:electron` and open the plugin `Development View` from the Unity Dev Helper menu.

### How to run tests
For testing we are using [Jest](http://facebook.github.io/jest/) and [enzyme](http://airbnb.io/enzyme/).
To run all tests, run:

```shell
$ yarn run test
```

### How to Build (Web app)
If you need just to build the app (without running a dev server), simply run:

```shell
$ yarn run build
```

### How to Build (Electron renderer app)
If you need just to build the app (without running a dev server) and be ready for the Unity Developer Hub, simply run:

```shell
$ yarn run build:electron
```

### Deploy to Unity Developer Helper

Unity Developer helper is not yet ready for deployment, but you can contact @emilmoeller in our unity slack channel if you have any questions.

