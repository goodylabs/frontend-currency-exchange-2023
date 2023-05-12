import React, { Component } from 'react';
import './style.css'

class ForeignCurrenciesRates extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todaysRates: [],
      yesterdaysRates: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('http://api.nbp.pl/api/exchangerates/tables/A/last/2/')
      .then(res => res.json())
      .then(json => {
        this.setState({
          yesterdaysRates: json.at(0),
          todaysRates: json.at(1),
          isLoaded: true,
        })
      });
  }

  currencyDifference(item) {
    var { yesterdaysRates } = this.state;

    const oldRates = yesterdaysRates.rates;

    for (let i=0; i<oldRates.length; i++) {
      if (oldRates.at(i).code == item.code) {
        if (oldRates.at(i).mid > item.mid) {
          return (
            <p className='fcr-value-down'>
              { item.code }
            </p>
          );
        }
        else if(oldRates.at(i).mid < item.mid) {
          return (
            <p className='fcr-value-up'>
              { item.code }
            </p>
          );
        }
        else {
          return (
            <p className='fcr-value-same'>
              { item.code }
            </p>
          );
        }
      }
    }
  }

  render() {
    var { isLoaded, todaysRates } = this.state;

    if (!isLoaded) {
      return (
        <div className='loading'>
          Data is loading!
        </div>
      );
    }
    else {
      const currentRates = todaysRates.rates;

      return (
        <div>
          <p>
            Current foreign currencies rate
          </p>
          <p>
              Data from: <span>{todaysRates.effectiveDate}</span>
          </p>
          <ul>
            {currentRates.map(item => (
              <li className='fcr-currencies' key={ item.code }>
                <div className='fcr-currency-code'>
                  <img src={require(`../../icons/${ item.code }.svg`)} alt={ item.code } height={ '30px' } />
                  {this.currencyDifference(item)}
                </div>
                <div className='fcr-currency-value'>
                  { Math.round(item.mid * 100000) / 100000 }
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default ForeignCurrenciesRates;