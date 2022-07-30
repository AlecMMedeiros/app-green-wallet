import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { DeleteData } from '../redux/actions';

class Table extends React.Component {
  renderCurrencyName = (ele) => {
    const { currency, exchangeRates } = ele;
    const currencyName = Object.values(exchangeRates)
      .find((element) => element.code === currency);
    return (<td>{ currencyName.name }</td>);
  }

  renderCurrencyRate = (ele) => {
    const { currency, exchangeRates } = ele;
    const rateBase = Object.values(exchangeRates)
      .find((elem) => elem.code === currency);
    return (<td>{ Number(rateBase.ask).toFixed(2) }</td>);
  }

  renderConvertedValue = (ele) => {
    const { currency, exchangeRates, value } = ele;
    const rateBase = Object.values(exchangeRates)
      .find((elem) => elem.code === currency);
    const convertedValue = rateBase.ask * value;
    return (<td>{ convertedValue.toFixed(2) }</td>);
  }

  handleDelete = ({ target }) => {
    const { value } = target;
    const { currenciesData: { expenses } } = this.props;
    const rateBase = Object.values(expenses)
      .filter((elem) => elem.id !== Number(value));
    const { Delete } = this.props;
    Delete(rateBase);
  }

  render() {
    const { currenciesData: { expenses } } = this.props;
    return (
      <>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((ele) => (
            <tr key={ ele.id }>
              <td>{ ele.description }</td>
              <td>{ ele.tag }</td>
              <td>{ ele.method }</td>
              <td>{ Number(ele.value).toFixed(2) }</td>
              { this.renderCurrencyName(ele) }
              { this.renderCurrencyRate(ele) }
              {this.renderConvertedValue(ele)}
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  type="button"
                  value={ ele.id }
                  onClick={ this.handleDelete }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  currenciesData: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  Delete: (payload) => dispatch(DeleteData(payload)),
});

Table.propTypes = {
  currenciesData: PropTypes.objectOf(PropTypes.string).isRequired,
  Delete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
