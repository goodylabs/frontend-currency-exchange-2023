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
      return (
        <div className='loading'>
          Data is loading!
        </div>
      );
    }
    else {
      let currencies = items.rates;
      return (
        <div>
          <p>
            Current foreign currencies rate
          </p>
          <p>
              Data from: <span>{items.effectiveDate}</span>
          </p>
          <ul>
            {currencies.map(item => (
              <li key={item.code}>
                {item.code}: {item.mid}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default ForeignCurrenciesRates;