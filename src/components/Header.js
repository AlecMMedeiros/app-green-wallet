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
        <div className="Logo">
          <p>GreenWallet</p>
        </div>
        <div className="userData">
          <p data-testid="email-field">
            Olá
            {' '}
            { email }
            !
          </p>
          Total das despesas:
          {' '}
          <span data-testid="total-field">
            {
              this.getTotalAmout()
            }
          </span>
          {' '}
          <span data-testid="header-currency-field">
            BRL
          </span>
        </div>
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
