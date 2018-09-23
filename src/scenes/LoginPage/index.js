import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { flowRight } from 'lodash';
import { Container, Form, Grid, Header, Loader, Message, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { authenticationActions } from 'data/authentication/actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(authenticationActions.logout());

        this.state = {
            username: '',
            password: '',
            otp: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, otp } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(authenticationActions.login({username, password, otp}));
        }
    }

    render() {
        const { t, loggingIn } = this.props;
        const { username, password, otp, submitted } = this.state;
        return (
          <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal'>
                {t('Login')}
              </Header>
              <Segment textAlign='left'>
              <Form name='form' onSubmit={this.handleSubmit}>
                <Form.Input icon='user' iconPosition='left' label={t('Username')} placeholder={t('Username')} type='text' name='username' value={username} required onChange={this.handleChange} />
                <Form.Input icon='lock' iconPosition='left' label={t('Password')} placeholder={t('Password')} type='password' name='password' value={password} required onChange={this.handleChange} />
                <Form.Input icon='lock' iconPosition='left' label={t('OTP')} placeholder={t('OTP')} type='text' name='otp' value={otp} required onChange={this.handleChange} />
                <Form.Button fluid color='teal' content={t('Login')} />
              </Form>
              </Segment>
              <Message>
              {loggingIn &&
                <Segment basic textAlign='center'>
                  <Loader active inline/>
                </Segment>
              }
              {!loggingIn &&
                <a href='#'>{t('Forget Password')}</a>
              }
              </Message>
            </Grid.Column>
          </Grid>
        );
    }
}

LoginPage.propTypes = {
  loggedIn: PropTypes.bool,
  t: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { loggingIn } = state.data.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(LoginPage);
export { connectedLoginPage as LoginPage };
