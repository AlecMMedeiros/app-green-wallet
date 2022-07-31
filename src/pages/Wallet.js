import React from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import WalletFormEdit from '../components/WalletFormEdit';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <>
        <Header />
        { editor === false ? <WalletForm /> : <WalletFormEdit /> }
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

Wallet.propTypes = {
  editor: propTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
