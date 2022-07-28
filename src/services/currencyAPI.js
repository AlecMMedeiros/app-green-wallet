const CURRENCY_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = async () => {
  const getApiData = await fetch(CURRENCY_API);
  const Allcurrencies = await getApiData.json();
  return Allcurrencies;
};

export default getCurrencies;
