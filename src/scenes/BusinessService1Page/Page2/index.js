import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { flowRight } from 'lodash';
import { Button, Container, Header, Item, List, Message, Step } from 'semantic-ui-react';

class Page2 extends React.Component {
    render() {
        const { t, i18n, user } = this.props;
        return (
          <Container>
            <Message color='olive'>
                This is the page 2
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

const connectedPage2 = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(Page2);
export { connectedPage2 as Page2 };
