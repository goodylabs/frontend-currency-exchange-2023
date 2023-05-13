import React, { Component } from 'react';
import './style.css'

class CurrencyChart extends Component {

  lastCurrency = '';

  constructor(props) {
    super(props);
    this.state = {
      Currency: [],
      isLoaded: false,
    }
  }

  updateCurrency() {
    if (this.props.currency !== undefined && this.props.currency !== '' && this.props.currency !== 'PLN') {
      fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${this.props.currency}/last/14`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          Currency: json,
          isLoaded: true,
        })
      });
    }
  }

  render() {
    var { isLoaded, Currency } = this.state;

    if (this.lastCurrency !== this.props.currency) {
      this.updateCurrency();
      this.lastCurrency = this.props.currency;
    }

    if (!isLoaded) {
      return (
        <div className='loading'>
          Data is loading!
        </div>
      );
    }
    else {
      const curCurrency = Currency.rates;

      return (
        <div>
          <p>
            Currency 14 days history
          </p>
          <ul>
            {curCurrency.map(item => (
              <li key={item.effectiveDate}>
                {item.effectiveDate}: {item.mid}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default CurrencyChart;