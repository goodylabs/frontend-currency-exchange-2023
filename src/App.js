import './App.css';
import ForeignCurrenciesRates from './components/foreign_currencies_rates/'
import GoldRates from './components/gold_rates/';

function App() {
  return (
    <div className='components-tests'>
      <ForeignCurrenciesRates></ForeignCurrenciesRates>
      <GoldRates></GoldRates>
    </div>
  );
}

export default App;
