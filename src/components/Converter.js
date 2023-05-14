import React, { Component } from "react";
import * as currenciesApi from '../helpers/CurrenciesApi';

class CurrencyConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      baseCurrency: 'EUR',
      targetCurrency: 'USD',
      amount: '1',
      convertedAmount: null,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies = async () => {
    try {
      const response = await currenciesApi.getAllCurrencies();
      const currencies = response[0].rates.map(rate => ({
        currency: rate.currency,
        code: rate.code,
        mid: rate.mid,
      }));
      currencies.push({ currency: 'Polish Zloty', code: 'PLN', mid: 1 }); // Add PLN currency
      this.setState({ currencies }, this.convertCurrency);
    } catch (error) {
      console.log('Error fetching currencies:', error);
      this.setState({ error: 'Failed to fetch currencies' });
    }
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, this.convertCurrency);
  };

  swapCurrencies = () => {
    const { baseCurrency, targetCurrency } = this.state;
    this.setState({ baseCurrency: targetCurrency, targetCurrency: baseCurrency }, this.convertCurrency);
  };

  convertCurrency = () => {
    const { currencies, baseCurrency, targetCurrency, amount } = this.state;
    const baseCurrencyRate = currencies.find(currency => currency.code === baseCurrency)?.mid;
    const targetCurrencyRate = currencies.find(currency => currency.code === targetCurrency)?.mid;
    const amountValue = parseFloat(amount);

    if (baseCurrencyRate && targetCurrencyRate && !isNaN(amountValue)) {
      const convertedAmount = (amountValue / baseCurrencyRate) * targetCurrencyRate;
      this.setState({ convertedAmount });
    } else {
      this.setState({ convertedAmount: null });
    }
  };

  render() {
    const { currencies, baseCurrency, targetCurrency, amount, convertedAmount, error } = this.state;

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="currency-converter-container">
        <div style={{height: '40px'}}></div>
        
        <div className="input-group">
          <label>Base Currency:</label>
          <select name="targetCurrency" value={targetCurrency} onChange={this.handleInputChange}>
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>{currency.code}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Target Currency:</label>
          <select name="baseCurrency" value={baseCurrency} onChange={this.handleInputChange}>
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>{currency.code}</option>
            ))}
          </select>
        </div>
        <div className="header-menu">
          <div className="button-group">
            <button onClick={this.swapCurrencies}>↑↓</button>
          </div>
        </div>
        <div className="input-group">
          <label>Amount:</label>
          <input type="number" name="amount" value={amount} onChange={this.handleInputChange} />
        </div>
        
        {convertedAmount !== null && (
          <div className="result-group">
          <p>Converted Amount: {convertedAmount.toFixed(2)} {baseCurrency}</p>
          </div>
          )}
          {convertedAmount === null && (
          <div className="result-group">
          <p>Converted Amount: {parseFloat(amount).toFixed(2)}</p>
          </div>
          )}
          </div>
          );
          }
          }
          
          export default CurrencyConverter;
