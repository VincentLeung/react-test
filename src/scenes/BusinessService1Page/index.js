import React from 'react';

import { Link, Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { flowRight } from 'lodash';
import { Button, Container, Header, Item, List, Message, Step, Table } from 'semantic-ui-react';

import { history } from 'helpers';
import { RouteMap } from 'routers';

import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { Page3 } from './Page3';

class BusinessService1Page extends React.Component {
    
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // this.props.dispatch(userActions.getAll());
    }

    render() {
        const { t, i18n, user } = this.props;
        const data = [
          { name: "businessservice1.page1", to: '/businessservice1/page1', comp: Page1, privateRoute: true },
          { name: "businessservice1.page2", to: '/businessservice1/page2', comp: Page2, privateRoute: true },
          { name: "businessservice1.page3", to: '/businessservice1/page3', comp: Page3, privateRoute: true }
         ];
        
        const items = data.map((d, i) => ({
          key: i,
          content: <Link to={d.to}>{t(d.name)}</Link>
        }));
        return (
          <Container>
            <Message color='green'>
                This is the Business Service 1 page
            </Message>
            <List items={ items } />
            <Router history={history}>
              <RouteMap routes={data}/>
            </Router>
          </Container>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state.data;
    const { user } = authentication;
    return {
        user
    };
}

const connectedBusinessService1Page = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(BusinessService1Page);
export { connectedBusinessService1Page as BusinessService1Page };
