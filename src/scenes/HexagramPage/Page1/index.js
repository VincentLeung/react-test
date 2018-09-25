import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { flowRight } from 'lodash';
import { Button, Container, Header, Item, List, Message, Table } from 'semantic-ui-react';
import { Block, Unit } from 'components';

class Page1 extends React.Component {
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
            children.push(<Table.HeaderCell><Block data = { { t, ...data, showName: true } } /></Table.HeaderCell>);
          });
        tableRow.push(<Table.Row key='-1'>{children}</Table.Row>);
        return tableRow;
    }

    createTableRow (t, row) {
        const rowBase = this.state.gData[row];
        let tableRow = [];
        let children = [];
        children.push(<Table.Cell><Block data = { { t, ...rowBase, showName: true } } /></Table.Cell>);
        this.state.gData.forEach(function(data){
            children.push(<Table.Cell><Unit data = { { t, ...rowBase, line4: data.line1, line5: data.line2, line6: data.line3, showName: true } } /></Table.Cell>);
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
        return (
          <Container>
            <Message color='olive'>
                {t('hexagram.page1')}
            </Message>

            <Table definition>
                <Table.Header>{ this.createTableHeader(t) }</Table.Header>
                <Table.Body>{ this.createTableBody(t) }</Table.Body>
            </Table>
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

const connectedPage1 = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(Page1);
export { connectedPage1 as Page1 };
