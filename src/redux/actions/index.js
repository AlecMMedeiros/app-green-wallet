import getCurrencies from '../../services/currencyAPI';

export const userLogin = (loginData) => ({ type: 'USER_LOGIN', loginData });

export const walletSave = (walletDataSaved) => ({ type: 'WALLET_SAVE', walletDataSaved });

export const getCurrenciesNames = (payload) => ({
  type: 'GET_CURRENCIES_NAMES',
  payload,
});

export const saveData = (payload) => ({
  type: 'SAVE_EXPENSE',
  payload,
});

export const getCurrenciesNamesThunk = () => async (dispatch) => {
  const response = await getCurrencies();
  const currenciesNames = Object.keys(response).filter((ele) => ele !== 'USDT');
  dispatch(getCurrenciesNames(currenciesNames));
};
