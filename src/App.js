import './App.css';
import Home from './components/home-section'
import ForeignCurrenciesRates from './components/foreign-currencies-rates'
import CurrenciesConverter from './components/currency-converter';
import GoldPrices from './components/gold-prices';

function App() {
  return (
    <>
      <Home></Home>
      <div className='main'>
        <div className='main-left'>
          <ForeignCurrenciesRates></ForeignCurrenciesRates>
        </div>
        <div className='main-right'>
          <CurrenciesConverter></CurrenciesConverter>
          <GoldPrices></GoldPrices>
        </div>
      </div>
    </>
  );
}

export default App;
