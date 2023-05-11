import React, { Component } from 'react';
import './style.css'

class CurrenciesConverter extends Component {

  constructor(props) {
    let curCurrency = 0;
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
        break;
      }
    }

    curValue.innerHTML = changeValue * this.curCurrency;

    if(event.target.value == '')
      curValue.innerHTML = '';
  }

  render() {
    var { isLoadedAll, allCurrencies } = this.state;

    if (!isLoadedAll) {
      console.log('Loading Data!');
      return (
        <div className='loading'>
          Data is loading!
        </div>
      );
    }
    else {
      console.log('Data Loaded Successfully!');
      const currencies = allCurrencies.rates;
      return (
        <div>
          <p>
            PLN
          </p>
          <input id='change-value' defaultValue={ 1 } type='text' onChange={this.onOptionChangeHandler}></input>

          <p>
            Choose currency
          </p>

          <select onChange={this.onOptionChangeHandler}>
            <option></option>
            {currencies.map(item => {
              return <option key={item.code}>{item.code}</option>
            })}
          </select>

          <p id='cur-value'></p>
        </div>
      );
    }
  }
}

export default CurrenciesConverter;