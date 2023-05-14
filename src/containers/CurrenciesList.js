import React, { Component } from "react";
import * as currenciesApi from '../helpers/CurrenciesApi';
import CurrencyChart from '../components/CurrencyChart';
import styled from 'styled-components'

const DivForPrices = styled.div`
  width:50%;
  max-height: 660px;
  height: auto;
  margin: 30px 40px;
  padding:10px 5px;
  border-radius: 20px;
 background: rgba(130, 130, 255, 0.2);
  //background: rgba(0,0,0,0.4);
  min-width: 500px;
`
const Currency = styled.div`
  display:flex;
  justify-content: space-between;
  padding: 0 20px;
  border-radius: 20px;
  margin: 10px auto;
  width:90%;
  cursor: pointer;
  &:hover {
    background: #ff00ff;
  }`

const MainDiv = styled.div`
  width:80%;
  display:flex;
  justify-content: center;
  margin: 0 auto;
`

class CurrenciesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      selectedCurrency: null,
      effectiveDate: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await currenciesApi.getAllCurrencies();
      if (response && Array.isArray(response[0]?.rates)) {
        const currencies = response[0].rates.map((rate) => ({
          currency: rate.currency,
          code: rate.code,
          mid: rate.mid,
        }));
        currencies.sort((a, b) => b.mid - a.mid);
        const effectiveDate = new Date(response[0].effectiveDate).toLocaleDateString('pl-PL');
        this.setState({ currencies, effectiveDate, selectedCurrency: currencies.find(curr => curr.code === 'USD') });
      } else {
        console.log('Invalid response format:', response);
      }
    } catch (error) {
      console.log('Error fetching currencies:', error);
    }
  }

  handleDivClick = (currency) => {
    this.setState({ selectedCurrency: currency });
  };
  render() {
    const { currencies, selectedCurrency, effectiveDate } = this.state;
    return (
      <div>     
        <MainDiv>
          <DivForPrices className='scroll'>
            <h2>Average currency rate</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', margin: '0 auto', fontSize: '18px'}}><p>Currency</p><p> Rate</p></div>
            {currencies.map((curr) => (
              <Currency
                key={curr.code}
                onClick={() => this.handleDivClick(curr)}
                style={{  backgroundColor: selectedCurrency === curr ? 'rgba(130, 130, 255, 0.4)' : "rgba(90,30,200,0.3)" }}>
                <h3>{curr.code}</h3> <p style={{fontSize:'18px'}}> {curr.mid} PLN</p>
              </Currency>
            ))}
          </DivForPrices>
          {selectedCurrency && (
            <CurrencyChart currencyCode={selectedCurrency.code} startDate={effectiveDate} />
          )}
        </MainDiv>
      </div>
    );
  }
}

export default CurrenciesList;
