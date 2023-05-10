import React, { Component } from 'react';

class ForeignCurrenciesRates extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('http://api.nbp.pl/api/exchangerates/tables/A')
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
        <div>
          <ul>
            {currencies.map(item => (
              <li key={item.code}>
                Code: {item.code} | Current Worth: {item.mid}
              </li>
            ))}
          </ul>
          <p>
            Update Data: {items.effectiveDate}
          </p>
        </div>
      );
    }
  }
}

export default ForeignCurrenciesRates;