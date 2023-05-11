import React, { Component } from 'react';
import CurrencyChart from '../currency-chart';
import './style.css'

class CurrenciesConverter extends Component {

  constructor(props) {
    let curCurrency = 0;
    let curCurrencyCode = '';
    super(props);
    this.state = {
      allCurrencies: [],
      isLoadedAll: false,
    }
  }

  componentDidMount() {
    fetch('http://api.nbp.pl/api/exchangerates/tables/A/')
      .then(res => res.json())
      .then(json => {
        this.setState({
          allCurrencies: json.at(0),
          isLoadedAll: true,
        })
      });
  }

  onOptionChangeHandler = (event) => {
    var { allCurrencies } = this.state;

    const currencies = allCurrencies.rates;
    const changeValue = parseFloat(document.getElementById('change-value').value);
    const curValue = document.getElementById('cur-value');

    for(let i=0; i<currencies.length; i++) {
      if(currencies.at(i).code == event.target.value)
      {
        this.curCurrency = currencies.at(i).mid;
        this.curCurrencyCode = currencies.at(i).code;
        break;
      }
    }

    curValue.innerHTML = changeValue * this.curCurrency;

    if(event.target.value == '')
    {
      curValue.innerHTML = '';
      this.curCurrencyCode = '';
    }

    //Component refresh to send new prop to CurrencyChart component
    this.setState({});
  }

  render() {
    var { isLoadedAll, allCurrencies } = this.state;

    if (!isLoadedAll) {
      return (
        <div className='loading'>
          Data is loading!
        </div>
      );
    }
    else {
      const currencies = allCurrencies.rates;

      return (
        <div>
          <p>
            PLN
          </p>
          <input id='change-value' defaultValue={ 1 } type='text' onChange={ this.onOptionChangeHandler }></input>

          <p>
            Choose currency
          </p>

          <select onChange={ this.onOptionChangeHandler }>
            <option></option>
            {currencies.map(item => {
              return <option key={ item.code }>{ item.code }</option>
            })}
          </select>

          <p id='cur-value'></p>

          <CurrencyChart currency={ this.curCurrencyCode }></CurrencyChart>
        </div>
      );
    }
  }
}

export default CurrenciesConverter;