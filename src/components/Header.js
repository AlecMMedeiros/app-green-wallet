import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { loginData: { email }, currenciesData: { expenses } } = this.props;
    let totalOfExpenses = 0;
    return (
      <header>
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          {
            expenses.map((element) => {
              if (element) {
                const { value, currency, exchangeRates } = element;
                const rateBase = Object.values(exchangeRates)
                  .find((ele) => ele.code === currency);
                totalOfExpenses += (rateBase.ask * value);
              }
              return null;
            })
          }
          {totalOfExpenses.toFixed(2)}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  loginData: state.user,
  currenciesData: state.wallet,
});

Header.propTypes = {
  loginData: PropTypes.objectOf(PropTypes.string).isRequired,
  currenciesData: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Header);
