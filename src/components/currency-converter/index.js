import React, { Component } from 'react';
import CurrencyChart from '../currency-chart';
import PLN from '../../icons/PLN.svg'
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

  //Function calculating currency value when changing option or PLN value and refreshing CurrencyChart component
  onOptionChangeHandler = (event) => {
    var { allCurrencies } = this.state;

    const currencies = allCurrencies.rates;
    const changeValue = parseFloat(document.getElementById('pln-change-value').value);
    const curValue = document.getElementById('currency-change-value');

    for(let i=0; i<currencies.length; i++) {
      if(currencies.at(i).code === event.target.value)
      {
        this.curCurrency = currencies.at(i).mid;
        this.curCurrencyCode = currencies.at(i).code;
        break;
      }
    }

    if(isNaN(changeValue))
      curValue.value = '';
    else
      curValue.value = Math.round((changeValue / this.curCurrency) * 100000) / 100000;

    if(event.target.value === '')
      curValue.value = '';

    //Component refresh to send new prop to CurrencyChart component
    this.setState({});
  }

  //Function calculating pln value when changing currency value
  onInputChangeHandler = () => {
    const changeValue = parseFloat(document.getElementById('currency-change-value').value);
    const curValue = document.getElementById('pln-change-value');

    if(isNaN(changeValue))
      curValue.value = '';
    else
      curValue.value = Math.round((changeValue * this.curCurrency) * 100000) / 100000;
  }

  //Function rendering flag using curCurrencyCode
  flagRender() {
    if(this.curCurrencyCode !== undefined && this.curCurrencyCode !== '') {
      return(
        <img src={require(`../../icons/${ this.curCurrencyCode }.svg`)} alt={ this.curCurrencyCode } height={ '30px' } />
      );
    }
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
          <img src={ PLN } alt='PLN' height={ '30px' } />

          <p>
            PLN
          </p>
          <input id='pln-change-value' defaultValue={ 1 } type='text' onChange={ this.onOptionChangeHandler }></input>

          <p>
            Choose currency
          </p>

          { this.flagRender() }

          <select onChange={ this.onOptionChangeHandler }>
            <option></option>
            {currencies.map(item => {
              return <option key={ item.code }>{ item.code }</option>
            })}
          </select>

          <input id='currency-change-value' type='text' onChange={ this.onInputChangeHandler }></input>

          <CurrencyChart currency={ this.curCurrencyCode }></CurrencyChart>
        </div>
      );
    }
  }
}

export default CurrenciesConverter;