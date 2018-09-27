import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { flowRight } from 'lodash';
import { Button, Container, Header, Item, List, Message, Table } from 'semantic-ui-react';
import { Trigram, Hexagram } from 'components';

class Page3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
    componentDidMount() {
        // this.props.dispatch(userActions.getAll());
    }

    createTableHeader (t) {
        let tableRow = [];
        let children = [];
        children.push(<Table.HeaderCell />);
        [ 0, 32, 48, 56, 60, 62, 58, 2 ].forEach((gramDec) => {
            children.push(<Table.HeaderCell><Hexagram data = { { gramDec, t, showName: true, nameType: 'gongHexagramName' } } /></Table.HeaderCell>);
        });
        tableRow.push(<Table.Row key='-1'>{children}</Table.Row>);
        return tableRow;
    }

    createTableRow (t, gramDecs) {
        let tableRow = [];
        let children = [];
        children.push(<Table.Cell><Trigram data = { { t, gramDec: gramDecs[0], showName: true, nameType: 'gongTrigramName' } } /></Table.Cell>);
        [ 0, 32, 48, 56, 60, 62, 58, 2 ].forEach((gramDec) => {
            children.push(<Table.Cell><Hexagram data = { { gramDec:  gramDec ^ gramDecs[1], t, showName: true } } /></Table.Cell>);
        });
        tableRow.push(<Table.Row key={gramDecs[0]}>{children}</Table.Row>);
        return tableRow;
    }

    createTableBody (t) {
        let body = [];
        const that = this;
        [ [7,63], [4,36], [2,18], [1,9], [0,0], [3,27], [5,45], [6,54] ].forEach((gramDec) => {
            body.push(that.createTableRow(t, gramDec));
        });
        return body;
    }

    render() {
        const { t, i18n, user } = this.props;
        return (
          <Container>
            <Message color='olive'>
                {t('hexagram.page3')}
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

const connectedPage3 = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(Page3);
export { connectedPage3 as Page3 };
