import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { flowRight } from 'lodash';
import { Container } from 'semantic-ui-react';

import { history } from 'helpers';
import { RouteMap } from 'routers';
import { CountryPage, HomePage, LoginPage, BusinessService1Page } from 'scenes';
import { Masthead } from './Masthead';
import { Footer } from './Footer';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = [
            { to: '/', comp: HomePage, privateRoute: true, exact: true },
            { to: '/country', comp: CountryPage, privateRoute: false },
            { to: '/login', comp: LoginPage, privateRoute: false },
            { to: '/home', comp: HomePage, privateRoute: true },
            { to: '/businessService1', comp: BusinessService1Page, privateRoute: true }
           ];
        return (
          <Container fluid style={{ display:'flex', minHeight:'100vh', flexDirection:'column' }}>
            <Masthead/>
            <Container fluid style={{ paddingTop:'20px', flex:1 }}>
                <Router history={history}>
                    <RouteMap routes={data}/>
                </Router>
            </Container>
            <Footer />
          </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

const connectedApp = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(App);
export { connectedApp as App };
