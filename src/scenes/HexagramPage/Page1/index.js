import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { flowRight } from 'lodash';
import { Button, Container, Header, Item, List, Message, Table } from 'semantic-ui-react';
import { Trigram, Hexagram } from 'components';

class Page1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.state.bgColorMap = [
            [3, 3, 3, 3, 3, 3, 3, 3],
            [3, 2, 2, 2, 2, 2, 2, 3],
            [3, 2, 1, 1, 1, 1, 2, 3],
            [3, 2, 1, 0, 0, 1, 2, 3],
            [3, 2, 1, 0, 0, 1, 2, 3],
            [3, 2, 1, 1, 1, 1, 2, 3],
            [3, 2, 2, 2, 2, 2, 2, 3],
            [3, 3, 3, 3, 3, 3, 3, 3]
        ];
        this.state.colorNames = [ 'white', 'yellow', 'teal' , 'olive' ];
    }
    componentDidMount() {
        // this.props.dispatch(userActions.getAll());
    }

    createTableHeader (t) {
        let tableRow = [];
        let children = [];
        children.push(<Table.HeaderCell />);
        for (var gramDec = 7; gramDec >=0; gramDec--) {
            children.push(<Table.HeaderCell><Trigram data = { { gramDec, t, showName: true } } /></Table.HeaderCell>);
        }
        tableRow.push(<Table.Row key='-1'>{children}</Table.Row>);
        return tableRow;
    }

    createTableRow (t, row) {
        const rowBase = 63 - 8 * row;
        let tableRow = [];
        let children = [];
        children.push(<Table.Cell><Trigram data = { { t, gramDec: 7 - row, showName: true } } /></Table.Cell>);
        for (var i = 0; i < 8; i++) {
            children.push(<Table.Cell style={{'background-color': this.state.colorNames[this.state.bgColorMap[row][i]]}}><Hexagram data = { { gramDec: rowBase - i, t, showName: true } } /></Table.Cell>);
        }
        tableRow.push(<Table.Row key={row}>{children}</Table.Row>);
        return tableRow;
    }

    createTableBody (t) {
        let body = [];
        const that = this;
        for (var i = 0; i < 8; i++) {
            body.push(that.createTableRow(t, i));
        }
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
