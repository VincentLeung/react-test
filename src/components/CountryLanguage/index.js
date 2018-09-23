import React from 'react';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { flowRight } from 'lodash';
import { Flag } from 'semantic-ui-react';

class CountryLanguage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { t, language, flag } = this.props;
      return (
        <span>
          <Flag name={flag} />{t(language)}
        </span>
      );
  }
}

function mapStateToProps(state) {
    return {
    };
}

const connectedCountryLanguage = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(CountryLanguage);
export { connectedCountryLanguage as CountryLanguage };
