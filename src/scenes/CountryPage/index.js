import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { flowRight } from 'lodash';
import { history } from 'helpers';
import PropTypes from 'prop-types';
import { Container, Divider, Header, Label } from 'semantic-ui-react';

import { CountryLanguage } from 'components';
import { setLanguage } from 'i18n';

class CountryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.changeLanguage = this.changeLanguage.bind(this);
    }
    changeLanguage(lng, flag, lngKey) {
      const { i18n } = this.props;
      if (i18n.language != lng) {
        setLanguage(lng, flag, lngKey);
      }
      history.goBack();
    }
    render() {
        const { t, i18n } = this.props;

        return (
          <Container>
            <Header as='h2'>
            {t('Country.Choose your country or region')}
            </Header>
            <Divider horizontal>{t('Country.Africa, Middle East, and India')}</Divider>
            <Label as='a' basic onClick={() => this.changeLanguage('am', 'am', 'Country.am')}><CountryLanguage flag='am' language='Country.am'/></Label>
            <Divider horizontal>{t('Country.Asia Pacific')}</Divider>
            <Label as='a' basic onClick={() => this.changeLanguage('zh-HK', 'hk', 'Country.zh-HK')}><CountryLanguage flag='hk' language='Country.zh-HK'/></Label>
            <Label as='a' basic onClick={() => this.changeLanguage('en-HK', 'hk', 'Country.en-HK')}><CountryLanguage flag='hk' language='Country.en-HK'/></Label>
            <Divider horizontal>{t('Country.Europe')}</Divider>
            <Label as='a' basic onClick={() => this.changeLanguage('be', 'be', 'Country.be')}><CountryLanguage flag='be' language='Country.be'/></Label>
            <Divider horizontal>{t('Country.Latin America and the Caribbean')}</Divider>
            <Label as='a' basic onClick={() => this.changeLanguage('ai', 'ai', 'Country.ai')}><CountryLanguage flag='ai' language='Country.ai'/></Label>
            <Divider horizontal>{t('Country.The United States, Canada, and Puerto Rico')}</Divider>
            <Label as='a' basic onClick={() => this.changeLanguage('en-US', 'us', 'Country.en-US')}><CountryLanguage flag='us' language='Country.en-US'/></Label>
          </Container>
        );
    }
}

CountryPage.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object
};

function mapStateToProps(state) {
    return {
    };
}

const connectedCountryPage = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(CountryPage);
export { connectedCountryPage as CountryPage };
