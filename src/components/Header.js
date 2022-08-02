import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  getTotalAmout = () => {
    const { expenses } = this.props; // Chamo a prop expenses - que reflete o state.user.expenses
    let totalOfExpenses = 0;
    expenses.map((element) => { // Aqui recebo o conjunt de objetos contidos em 'expenses'
      const { value, currency, exchangeRates } = element; // Descontruo o objeto separandos as chaves value, currency e exchangeRates
      const rateBase = Object.values(exchangeRates) // Faço um busca nos valores da chave exchangeRates, buscando o onde esse valor é igual ao da curreny
        .find((ele) => ele.code === currency);
      totalOfExpenses += (rateBase.ask * value); // Adiciono o valor ask (rate) multiplicado pelo value a variável totalOfExpenses
      return totalOfExpenses.toFixed(2); // retorno o valor acumulado em totalOfExpenses fixado em 2 casas decimais
    });
    return totalOfExpenses.toFixed(2); // Caso expenses esteja vazio, retorno totalOfExpenses fixado em 2 casas decimais (0.00)
  }

  render() {
    const { email } = this.props; // Chamo a prop email - que reflete o state.user.email
    return (
      <header>
        <div className="Logo">
          <p>GreenWallet</p>
        </div>
        <div className="userData">
          <p data-testid="email-field">
            Olá
            {' '}
            { email /* Exibo o conteúdo da prop e-mail no Header */ }
            !
          </p>
          Total das despesas:
          {' '}
          <span data-testid="total-field">
            {
              this.getTotalAmout() // Chamo a função para exibir no Header o valor acumulado das despesas
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
  email: state.user.email, // Transformo o state.user.email em um prop chamada email
  expenses: state.wallet.expenses, // Transformo o state.wallet.expenses em um prop chamada expenses
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(Header); // Conecto o componente Header ao Redux trazendo apenas a possibilidade de transformar state em props
