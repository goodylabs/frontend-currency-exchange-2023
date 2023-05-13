import React, { Component } from 'react';
import CurrencyChart from '../currency-chart';
import PLN from '../../icons/PLN.svg'
import './style.css'

class CurrenciesConverter extends Component {

  curCurrency = 1;
  curCurrencyCode = 'PLN';

  constructor(props) {
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

    for (let i=0; i<currencies.length; i++) {
      if (currencies.at(i).code === event.target.value)
      {
        this.curCurrency = currencies.at(i).mid;
        this.curCurrencyCode = currencies.at(i).code;
        break;
      }
    }

    if (isNaN(changeValue) || this.curCurrencyCode === undefined)
      curValue.value = '';
    else if (event.target.value === '')
    {
      curValue.value = '';
      this.curCurrency = 0;
      this.curCurrencyCode = '';
    }
    else if (this.curCurrencyCode !== '' && this.curCurrency !== 0)
      curValue.value = Math.round((changeValue / this.curCurrency) * 100) / 100;

    //Component refresh to send new prop to CurrencyChart component
    this.setState({});
  }

  //Function calculating pln value when changing currency value
  onInputChangeHandler = () => {
    const changeValue = parseFloat(document.getElementById('currency-change-value').value);
    const curValue = document.getElementById('pln-change-value');

    if (isNaN(changeValue) || this.curCurrencyCode === undefined)
      curValue.value = '';
    else
      curValue.value = Math.round((changeValue * this.curCurrency) * 100) / 100;
  }

  //Function rendering flag using curCurrencyCode
  flagRender() {
    if (this.curCurrencyCode !== undefined && this.curCurrencyCode !== '') {
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
        <>
          <div className='cc-container'>
            <div className='cc-pln'>
              <img src={PLN} alt='PLN' height={'30px'} />
              <p>PLN</p>
              <input className='cc-input' id='pln-change-value' defaultValue={ 1 } type='text' maxLength={ '7' } onChange={this.onOptionChangeHandler}></input>
            </div>
            
            <div className='cc-equal-sign'>
              <div></div>
              <div></div>
            </div>

            <div className='cc-currency'>
              <input className='cc-input' id='currency-change-value' defaultValue={ 1 } type='text' maxLength={ '7' } onChange={this.onInputChangeHandler}></input>
              <select onChange={this.onOptionChangeHandler}>
                <option>PLN</option>
                {currencies.map(item => {
                  return <option key={item.code}>{item.code}</option>;
                })}
              </select>
              {this.flagRender()}
            </div>
          </div>
          
          <CurrencyChart currency={this.curCurrencyCode}></CurrencyChart>
        </>
      );
    }
  }
}

export default CurrenciesConverter;