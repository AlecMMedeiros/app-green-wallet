import React from 'react';
import { connect } from 'react-redux';

class ExpensesTable extends React.Component {
  render() {
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
          <tr>
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td />
            <td colSpan={ 2 } />
            <td />
          </tr>
        </tbody>

      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loginData: state.user,
  currenciesData: state.wallet,
});

export default connect(mapStateToProps)(ExpensesTable);
