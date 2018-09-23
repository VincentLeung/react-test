import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { flowRight } from 'lodash';
import { Button, Container, Header, Item, List, Message, Step } from 'semantic-ui-react';

class Page1 extends React.Component {
    render() {
        const { t, i18n, user } = this.props;
        return (
          <Container>
            <Message color='olive'>
                This is the page 1
            </Message>
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
