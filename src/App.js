import './App.css';
import './styles/home.css';
import HomeImage from './images/home-money.jpg'
import ForeignCurrenciesRates from './components/foreign_currencies_rates/'
import GoldRates from './components/gold_rates/';

function App() {
  return (
    <section className='home-section'>
      <div className='home-left-section'>
        <a href="http://www.freepik.com">
          <img src={ HomeImage } alt='' width={ '500px' }></img>
        </a>
      </div>
      <div className='home-right-section'>
        <p className='home-title'>
          you<span>R</span>
        </p>
        <p className='home-title'>
          e<span>X</span>change
        </p>
        <p className='home-title'>
          <span>R</span>ates
        </p>
        <p className='home-description'>
          Let us show you how much your <span>PLN</span> is worth on the market!
          You will be shocked..
        </p>
      </div>
    </section>
  );
}

export default App;
