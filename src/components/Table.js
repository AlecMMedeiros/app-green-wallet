import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { DeleteData, EditData } from '../redux/actions';

class Table extends React.Component {
  renderOrderedIds = (a, b) => a.id - b.id;

  renderGeneralProperties = (ele, property) => {
    const { currency, exchangeRates, value } = ele;
    const rateBase = Object.values(exchangeRates)
      .find((elem) => elem.code === currency);
    if (property === 'conversion') {
      const convertedValue = rateBase.ask * value;
      return (<td>{ convertedValue.toFixed(2) }</td>);
    }
    if (property === 'name') {
      return (<td>{ rateBase.name }</td>);
    }
    if (property === 'rate') {
      return (<td data-testid="rate-value">{ Number(rateBase.ask).toFixed(2) }</td>);
    }
  }

  handleDelete = ({ target }) => {
    const { value } = target;
    const { expenses } = this.props;
    const rateBase = Object.values(expenses)
      .filter((elem) => elem.id !== Number(value));
    const { Delete } = this.props;
    Delete(rateBase);
  }

  handleEdit = ({ target }) => {
    const { value } = target;
    const { expenses } = this.props;
    const getToBeEdited = Object.values(expenses)
      .filter((elem) => elem.id === Number(value));
    const { Edit } = this.props;
    Edit(getToBeEdited);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
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
          {expenses.sort(this.renderOrderedIds).map((ele) => (
            <tr key={ ele.id }>
              <td>{ ele.description }</td>
              <td>{ ele.tag }</td>
              <td>{ ele.method }</td>
              <td>{ Number(ele.value).toFixed(2) }</td>
              { this.renderGeneralProperties(ele, 'name') }
              { this.renderGeneralProperties(ele, 'rate') }
              {this.renderGeneralProperties(ele, 'conversion')}
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  name="editButton"
                  value={ ele.id }
                  onClick={ this.handleEdit }
                  className="btn btn-warning btn-sm"
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  name="deleteButton"
                  value={ ele.id }
                  onClick={ this.handleDelete }
                  className="btn btn-danger btn-sm"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  Delete: (payload) => dispatch(DeleteData(payload)),
  Edit: (payload) => dispatch(EditData(payload)),
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object.isRequired).isRequired,
  Delete: propTypes.func.isRequired,
  Edit: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
