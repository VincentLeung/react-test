# Sample React + Redux

This the bare minimum project boilerplate based on React and Redux, and it include a simple use case of JWT Authentication

# Folder Structure

```
react-test1
├── .babelrc                (Resouce config file for babel)
├── .gitignore              (Classic git ignore file)
├── coverage                (Folder created by test tool -Jest, it contains code coverage reports)
├── dist                    (Distrbution folder, it is created by npm run build)
├── node_modules            (Dependency folder, create by npm run setup)
├── package.json            (Classic project folder)
├── package-lock.json       (File contains dependency detail, created by npm run setup)
├── README.md               (This readme file)
├── src                     (Root source folder)
│   ├── components          (React common component folder)
│   ├── constants           (Constants folder)
│   ├── data                (Data folder contains React Redux actions and reducers)
│   ├── helpers             (Helps folder)
│   ├── index.html          (Entry point html)
│   ├── index.js            (Entry point js)
│   ├── routers             (React router folder)
│   ├── scenes              (React scenes components folder)
│   ├── services            (Service folder)
│   └── __tests__           (Unit test folder)
├── webpack.dev.config.js   (Webpack dev config file)
└── webpack.prod.config.js  (Webpack prod config file)
```

Folder not stored in BitBucket
- coverage
- dist
- node_modules

Both `src/components` and `src/scenes` will store React components, their differences are common used React components will be stored under `src/components` folder, while scene specific React components will be strored under `src/scenes`

# Tear down of src folder with use case - JWT Authentication
## All folders excepted data and unit test folder
All folders (excepted data and unit test folders) under src will contains sub-folder, and the sub-folder is named by feature/function, and an index.js file plays the role to export all the underlying features/functions.

For example, the constants folder belows contains alertConstants and userContants, and the index.js will export both alertConstants and userContants
```
src
├── constants
│   ├── alert
│   │   └── index.js
│   ├── index.js
│   └── user
│       └── index.js
```

For the class (e.g. alert reducer) using alertConstants, we can code in this way
```javascript
import { alertConstants } from 'constants';
```
For an abstract class using both alertConstants and userConstants, we can code in this way
```javascript
import { alertConstants, userConstants } from 'constants';
```
We don't need to code this way
```javascript
import { alertConstants } from 'constants';
import { userConstants } from 'constants';
```

It is noted that we don't need to specify the exact path for the constants import above, we just use `'constants'`.  It is because the constants/index.js played the role to export all the undelying constants
```javascript
export * from './alert';
export * from './user';
```

The file name under these folder must be index.js

## Data folder
Data folder contains React Redux actions and reducers files, and the file name of action is `actions.js`, and file name of reducer is `reducer.js`.  The action and reducer file are groupped under its feature/function folder.  For example, in this sample, we have alert, authaction, and users action&reduer.  The folder strucure is then
```
├── data
│   ├── alert
│   │   ├── actions.js
│   │   └── reducer.js
│   ├── authentication
│   │   ├── actions.js
│   │   ├── reducer.js
│   │   ├── sagas.js
│   │   └── types.js
│   ├── reducer.js
│   ├── sagas.js
│   └── users
│       ├── actions.js
│       ├── reducer.js
│       ├── sagas.js
│       └── types.js
```
The `data/reducer.js` is the dataReducer, and it is referenced by the `/src/rootReducer.js`

## Service folder
The actual implmentation of the restful service call is implmented in the service folder, and again the folder structure is groupped by feature/function.  E.g. the user related service is under `services/user/index.js`

## Unit test folder
For the unit test folder (i.e. `__tests__`), the folder strucure is the same as the src

# Internationalization
We use react-i18next (https://react.i18next.com).  The configuration file is `src/i18n/index.js`.

## Translation files
For local development, the translation files are under /i18n/translations/{language}.json.  Nested translation groupping is supported, e.g. We can define the translation in this way
``` json
{
  "App": {
    "Masthead": {
      "en-HK": "Hong Kong"
    }
  }
}
```
When we use the key `App.Masthead.en-HK` to do the translation lookup, the result will be "Hong Kong".

To use the i18n feature on the react component, we need to:

1. import the module. `import { translate, Trans } from 'react-i18next';`
1. extends the component with `translate("translations")`, such as

    `const connectedMasthead = flowRight(    `

      `translate("translations"),    `

      `connect(mapStateToProps)    `

    `)(Masthead);`

1. Obtain `i18n` and/or 't' in the render(), such as `const { t, i18n } = this.props;`
1. Do the translation by using t, such as `{t('App.Masthead.en-US')}`, e.g.

    `<Item as='a' onClick={() => changeLanguage('en')}><Flag name='us' />{t('App.Masthead.en-US')}</Item>`

1. Do the translation by using <Trans/>, such as

    `<Trans i18nKey="Greeting user" values={{ firstName: user.firstName, lastName: user.lastName}}>    `

        Hi firstname lastname    

    `</Trans>`

# UI Component Library
We use Semantic UI React (https://react.semantic-ui.com/) as the project UI Component Library.

To use it, we have to

1. import the module(s), e.g. `import { Container, Flag, Header, Item } from 'semantic-ui-react';`
1. Use them in the render() method, such as
```
<Container>
  <Header as='h1' dividing>
    {t('App.Masthead.Welcome to React')}
  </Header>
  <Item as='a' onClick={() => changeLanguage('en')}><Flag name='us' />{t('App.Masthead.en-US')}</Item>
  <Item as='a' onClick={() => changeLanguage('zh-HK')}><Flag name='hk' />{t('App.Masthead.zh-HK')}</Item>
</Container>
```

# Async api server call
This project use redux-saga to manage the async api call, and the corresponding source code is groupped by feature/functions under `src/data`.  For example, the authaction related sources are:
```
data
├── authentication
│   ├── actions.js
│   ├── reducer.js
│   ├── sagas.js
│   └── types.js
```
`actions.js` - defined the redux action creators, and actions  
`reducer.js` - defined the redux reducer  
`sagas.js` - defined the redux sagas  
`types.js` - defined the type constants  

# Debugger
This project uses redux-devtools-extension as one of the devtools, please install the browser plugin

- https://github.com/zalmoxisus/redux-devtools-extension
- https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en

# Download dependency
```bash
npm run setup
```
The dependencies will be stored under node_modules folder

# Run in develop mode
```bash
npm run start
```
Application start at host 0.0.0.0, and port 3000
Let your browser visit https://localhost:3000

# Run unit test (with coverage)
```bash
npm run test
```
Unit test under __tests__ folder will be executed, and the coverage report will be stored in coverage folder

# Clean the project
```bash
npm run clean
```
Unit test coverage report folder (i.e. coverage), and build distrbution folder (i.e. dist) will be removed

# Clean all the project (incding dependency)
```bash
npm run clean-all
```
Other than unit test coverage report folder and buid distrbution folder, dependency folder (i.e. node_modules) will be removed

# Build for production
```bash
npm run build
```
Application build folder (i.e dist) will be created, and it contains the build artifacts
