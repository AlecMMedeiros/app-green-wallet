import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { AlterData, DeleteData } from '../redux/actions';

class WalletFormEdit extends React.Component {
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
    const { toBeEdited } = this.props;
    this.setState({
      id: toBeEdited[0].id,
      value: toBeEdited[0].value,
      description: toBeEdited[0].description,
      currency: toBeEdited[0].currency,
      method: toBeEdited[0].method,
      tag: toBeEdited[0].tag,
      exchangeRates: toBeEdited[0].exchangeRates,
    });
  }

  handleChange= ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = async () => {
    const { currenciesData: { expenses }, toBeEdited } = this.props;
    const rateBase = Object.values(expenses)
      .filter((elem) => elem.id !== Number(toBeEdited[0].id));
    const { Delete } = this.props;
    await Delete(rateBase);
    const { Change } = this.props;
    Change(this.state);
  }

  render() {
    const { currencies } = this.props;
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
            alt="value"
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <input
            alt="description"
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
            data-testid="save-btn"
            name="AddExpense"
            value="Adicionar despesa"
            onClick={ this.handleSubmit }
          >
            Editar despesa
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  Change: (payload) => dispatch(AlterData(payload)),
  Delete: (payload) => dispatch(DeleteData(payload)),
});

const mapStateToProps = (state) => ({
  toBeEdited: state.wallet.toBeEdited,
  currencies: state.wallet.currencies,
  currenciesData: state.wallet,
});

WalletFormEdit.propTypes = {
  Change: propTypes.func.isRequired,
  Delete: propTypes.func.isRequired,
  toBeEdited: propTypes.objectOf(propTypes.object.isRequired).isRequired,
  currencies: propTypes.objectOf(propTypes.string.isRequired).isRequired,
  currenciesData: propTypes.objectOf(propTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletFormEdit);
