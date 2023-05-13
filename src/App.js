import './App.css';
import Home from './pages/home-section'
import ForeignCurrenciesRates from './pages/foreign-currencies-rates'
import CurrenciesConverter from './pages/currency-converter';
import GoldPrices from './pages/gold-prices';

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

      <footer class="footer">
        Created <span>by</span> Jakub Matuszak<span> &#169;2023</span>
      </footer>
    </>
  );
}

export default App;
