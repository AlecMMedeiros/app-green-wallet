import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrenciesThunk } from '../redux/actions';

class WalletForm extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { currenciesData: { currencies } } = this.props;
    return (
      <form>
        <div>
          <input
            data-testid="value-input"
            type="number"
          />
        </div>
        <div>
          <input
            data-testid="description-input"
            type="text"
          />
        </div>
        {console.log(currencies)}
        <div>
          <label htmlFor="moedas">
            Moeda:
            <select data-testid="currency-input" name="moedas" id="moedas">
              {currencies.map((ele) => <option key={ ele } value={ ele }>{ele}</option>)}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="method">
            Método de pagamento:
            <select data-testid="method-input" name="method" id="method">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de crédito">Cartão de débito</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="categoria">
            Categoria:
            <select data-testid="tag-input" name="categoria" id="categoria">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesThunk()),
});

const mapStateToProps = (state) => ({
  currenciesData: state.wallet,
});

WalletForm.propTypes = {
  getCurrencies: propTypes.func.isRequired,
  currenciesData: propTypes.objectOf(propTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
