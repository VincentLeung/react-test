import React from 'react';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { flowRight } from 'lodash';
import { history } from 'helpers';
import { Button, Container, Dropdown, Header, Icon, Image, Menu, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { CountryLanguage } from 'components';

import { authenticationActions } from 'data/authentication/actions';
import { alertActions } from 'data/alert/actions';

class Masthead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          activeItem: history.location.pathname
        };

        const { dispatch } = this.props;
        history.listen((location, action) => {
            this.setState({ activeItem: history.location.pathname });
            // clear alert on location change
            dispatch(alertActions.clear());
        });

        this.handleItemClick = this.handleItemClick.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleItemClick(e, target) {
      if (this.state.activeItem != target.name) {
        this.setState({ activeItem: target.name });
        if (target.name == '/country') {
          history.push(target.name);
        } else {
          history.replace(target.name);
        }
      }
    }

    logout(e, target) {
      // reset login status
      this.props.dispatch(authenticationActions.logout());
      // this.setState({ activeItem: '/' });
      history.replace('/');
    }

    render() {
      const { t, i18n, loggedIn, currentUser, alert } = this.props;
      const { activeItem } = this.state;
      return (
        <Container fluid>
          <Menu>
            <Menu.Item header
              name='/home'
              onClick={this.handleItemClick}
            >
              <Image.Group size='tiny'>
                <Image src='/assets/images/logo.png' />
              </Image.Group>
              <Header as='h1'>
                {t('App.Masthead.Company Greetings')}
                <Header.Subheader>{t('App.Masthead.Company Summary')}</Header.Subheader>
              </Header>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item
                name='/country'
                active={activeItem === '/country'}
                onClick={this.handleItemClick}
              >
                <CountryLanguage flag={i18n.flag} language={i18n.lngKey} />
              </Menu.Item>
            {loggedIn && currentUser && currentUser.parsedCredentialDto &&
              <Menu.Menu position='right'>
                <Dropdown item text={currentUser.parsedCredentialDto.username}>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={this.logout}>{t('App.Masthead.logout')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            }
            {!loggedIn &&
              <Menu.Item>
                <Button
                  primary
                  name='/login'
                  active={activeItem === '/login'}
                  onClick={this.handleItemClick}
                  content={t('App.Masthead.login')}
                />
              </Menu.Item>
            }
            </Menu.Menu>
          </Menu>
          {alert.message &&
              <Container>
                <Message icon className={`${alert.type}`}>
                  {alert.icon &&
                    <Icon name={`${alert.icon}`} />
                  }
                {t('errorMessage.' + alert.message)}
                </Message>
              </Container>
          }
        </Container>
      );
    }
}

Masthead.propTypes = {
  activeItem: PropTypes.string,
  alert: PropTypes.shape ({
      type: PropTypes.string,
      icon: PropTypes.string,
      message: PropTypes.string
  }),
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object,
  loggedIn: PropTypes.bool,
  currentUser: PropTypes.object
};

function mapStateToProps(state) {
  const { authentication, alert  } = state.data;
  const { loggedIn, currentUser } = authentication;
  return {
      alert,
      loggedIn,
      currentUser
  };
}

const connectedMasthead = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(Masthead);
export { connectedMasthead as Masthead };
