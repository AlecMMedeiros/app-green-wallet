import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  getTotalAmout = () => {
    const { expenses } = this.props;
    let totalOfExpenses = 0;
    expenses.map((element) => {
      const { value, currency, exchangeRates } = element;
      const rateBase = Object.values(exchangeRates)
        .find((ele) => ele.code === currency);
      totalOfExpenses += (rateBase.ask * value);
      return totalOfExpenses.toFixed(2);
    });
    return totalOfExpenses.toFixed(2);
  }

  render() {
    const { loginData: { email } } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          {
            this.getTotalAmout()
          }
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
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  loginData: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(Header);
