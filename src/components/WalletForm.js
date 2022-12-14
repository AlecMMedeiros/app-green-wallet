import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import getCurrencies from '../services/currencyAPI';

import { getCurrenciesNamesThunk, saveData, setActualId } from '../redux/actions';

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
    const { getCurrenciesNames, actualId } = this.props;
    getCurrenciesNames();
    this.setState({ id: actualId + 1 });
  }

  handleChange= ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = async () => {
    const { sendSaveData, saveActualId } = this.props;
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
    saveActualId(id);
  }

  render() {
    const { currencies } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    return (
      <form className="WalletForm">
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
            placeholder="Valor"
          />
        </div>
        <div>
          <input
            data-testid="description-input"
            type="text"
            maxLength="20"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            placeholder="Descrição da despesa"
          />
        </div>
        <div>
          <label htmlFor="currency">
            Moeda:
            {' '}
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
            {' '}
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
            {' '}
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
          {' '}
          <button
            type="button"
            className="btn btn-success btn-sm"
            data-testid="save-btn"
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
  saveActualId: (payload) => dispatch(setActualId(payload)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  actualId: state.wallet.actualId,
});

WalletForm.propTypes = {
  getCurrenciesNames: propTypes.func.isRequired,
  sendSaveData: propTypes.func.isRequired,
  saveActualId: propTypes.func.isRequired,
  actualId: propTypes.number,
  currencies: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
};

WalletForm.defaultProps = {
  actualId: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
