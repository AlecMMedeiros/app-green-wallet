import getCurrencies from '../../services/currencyAPI';

export const userLogin = (loginData) => ({ type: 'USER_LOGIN', loginData });

export const walletSave = (walletDataSaved) => ({ type: 'WALLET_SAVE', walletDataSaved });

export const getCurrenciesAll = (payload) => ({
  type: 'GET_CURRENCIES_ALL',
  payload,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  const response = await getCurrencies();
  const currenciesNames = Object.keys(response).filter((ele) => ele !== 'USDT');
  dispatch(getCurrenciesAll(currenciesNames));
};
