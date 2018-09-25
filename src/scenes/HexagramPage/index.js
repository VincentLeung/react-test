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

class HexagramPage extends React.Component {
    
    render() {
        const { t, i18n, user } = this.props;
        const data = [
          { name: "hexagram.page1", to: '/hexagram/page1', comp: Page1, privateRoute: true },
          { name: "hexagram.page2", to: '/hexagram/page2', comp: Page2, privateRoute: true },
          { name: "hexagram.page3", to: '/hexagram/page3', comp: Page3, privateRoute: true }
         ];
        
        const items = data.map((d, i) => ({
          key: i,
          content: <Link to={d.to}>{t(d.name)}</Link>
        }));
        return (
          <Container>
            <Message color='green'>
                This is the hexagram page
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

const connectedHexagramPage = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(HexagramPage);
export { connectedHexagramPage as HexagramPage };
