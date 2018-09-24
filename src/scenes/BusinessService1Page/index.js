import React from 'react';
import { Block, Unit } from 'components';

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
        const gData = [
            { line1: 1, line2: 1, line3: 1 },
            { line1: 1, line2: 1, line3: 0 },
            { line1: 1, line2: 0, line3: 1 },
            { line1: 1, line2: 0, line3: 0 },
            { line1: 0, line2: 1, line3: 1 },
            { line1: 0, line2: 1, line3: 0 },
            { line1: 0, line2: 0, line3: 1 },
            { line1: 0, line2: 0, line3: 0 },
        ];
        this.state = { gData };
    }
    componentDidMount() {
        // this.props.dispatch(userActions.getAll());
    }

    createTableHeader (t) {
        let tableRow = [];
        let children = [];
        children.push(<Table.HeaderCell />);
        this.state.gData.forEach(function(data){
            children.push(<Table.HeaderCell><Block data = { { t, ...data } } /></Table.HeaderCell>);
          });
        tableRow.push(<Table.Row key='-1'>{children}</Table.Row>);
        return tableRow;
    }

    createTableRow (t, row) {
        const rowBase = this.state.gData[row];
        let tableRow = [];
        let children = [];
        children.push(<Table.Cell><Block data = { { t, ...rowBase } } /></Table.Cell>);
        this.state.gData.forEach(function(data){
            children.push(<Table.Cell><Unit data = { { t, ...rowBase, line4: data.line1, line5: data.line2, line6: data.line3 } } /></Table.Cell>);
          });
        tableRow.push(<Table.Row key={row}>{children}</Table.Row>);
        return tableRow;
    }

    createTableBody (t) {
        let body = [];
        const that = this;
        this.state.gData.forEach(function(data, i){
            body.push(that.createTableRow(t, i));
          });
        return body;
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

            <Table definition>
                <Table.Header>{ this.createTableHeader(t) }</Table.Header>
                <Table.Body>{ this.createTableBody(t) }</Table.Body>
            </Table>

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
