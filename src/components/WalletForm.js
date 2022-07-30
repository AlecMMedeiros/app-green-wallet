import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import getCurrencies from '../services/currencyAPI';

import { getCurrenciesNamesThunk, saveData } from '../redux/actions';

class WalletForm extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
    };
  }

  componentDidMount() {
    const { getCurrenciesNames } = this.props;
    getCurrenciesNames();
  }

  handleChange= ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = async () => {
    const { sendSaveData } = this.props;
    const { id } = this.state;
    const getExchangeRates = await getCurrencies();
    delete getExchangeRates.USDT;
    this.setState({
      exchangeRates: getExchangeRates,
    });
    sendSaveData(this.state);
    this.setState(
      { id: id + 1,
        value: '',
        description: '',
      },
    );
  }

  render() {
    const { currenciesData: { currencies } } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    return (
      <form>
        <p>
          Id:
          {' '}
          { id }
        </p>
        <div>
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              id="currency"
              onChange={ this.handleChange }
            >
              {currencies.map((ele) => <option key={ ele } value={ ele }>{ele}</option>)}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="method">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              id="method"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="categoria">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              id="categoria"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            name="AddExpense"
            value="Adicionar despesa"
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesNames: () => dispatch(getCurrenciesNamesThunk()),
  sendSaveData: (payload) => dispatch(saveData(payload)),
});

const mapStateToProps = (state) => ({
  currenciesData: state.wallet,
});

WalletForm.propTypes = {
  getCurrenciesNames: propTypes.func.isRequired,
  sendSaveData: propTypes.func.isRequired,
  currenciesData: propTypes.objectOf(propTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
