import '../App.css';
import { Container } from 'react-bootstrap';
import AverageExchangeRates from './Averageexchangerates';
import GoldPrice from './Goldprice';
import CurrencyConverter from './Currencyconverter';
import HistoricalExchangeRates from './Historicalexchangerates';
function Home() {
    return (
        <Container className='spacer'>
            <AverageExchangeRates />
            <GoldPrice />
            <HistoricalExchangeRates />
            <CurrencyConverter />
        </Container>
  );
}

export default Home;
