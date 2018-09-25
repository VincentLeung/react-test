import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { flowRight } from 'lodash';
import { history } from 'helpers';
import { Button, Container, Header, Item, List, Message } from 'semantic-ui-react';

class HomePage extends React.Component {
  constructor(props) {
      super(props);
      this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick(e, target) {
    history.replace(target.dest);
  }

    render() {
        const { t, i18n, user } = this.props;
        return (
          <Container>
            <Message color='olive'>
                This is the home page
            </Message>
            <Button primary
              dest='/hexagram'
              onClick={this.handleItemClick}
            >
              {t('App.Masthead.hexagram')}
            </Button>
            <Button primary
              dest='/businessservice1'
              onClick={this.handleItemClick}
            >
              {t('App.Masthead.businessService1')}
            </Button>
            <Button primary disabled
              dest='/businessservice2'
              onClick={this.handleItemClick}
            >
              {t('App.Masthead.businessService2')}
            </Button>
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

const connectedHomePage = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(HomePage);
export { connectedHomePage as HomePage };
