import React, { Component } from 'react';
import './style.css'

class ForeignCurrenciesRates extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('http://api.nbp.pl/api/exchangerates/tables/A/')
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json.at(0),
          isLoaded: true,
        })
      });
  }

  render() {
    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      console.log('Loading Data!');
      return (
        <div>
          Data is loading!
        </div>
      );
    }
    else {
      console.log('Data Loaded Successfully!');
      console.log(items);
      let currencies = items.rates;
      console.log(currencies);
      return (
        <div className='fcr-ontainer'>
        <p className='fcr-title'>
          <span>Current</span> foreign currencies rate
        </p>
          <ul className='fcr-list'>
            {currencies.map(item => (
              <li className='fcr-list-item' key={item.code}>
                <span>{item.code}:</span> {item.mid}
                <p className='fcr-currency-name'>
                  {item.currency}
                </p>
              </li>
            ))}
          </ul>
          <p className='fcr-date'>
            Data from: <span>{items.effectiveDate}</span>
          </p>
        </div>
      );
    }
  }
}

export default ForeignCurrenciesRates;