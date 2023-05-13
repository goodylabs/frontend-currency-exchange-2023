import React, { Component } from "react";

import PLN from "../../icons/PLN.svg";

import "./style.css";

class ForeignCurrenciesRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todaysRates: [],
      yesterdaysRates: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("https://api.nbp.pl/api/exchangerates/tables/A/last/2/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          yesterdaysRates: json.at(0),
          todaysRates: json.at(1),
          isLoaded: true,
        });
      });
  }

  //Function calculating currency difference between two days for it proper styling
  currencyDifference(item) {
    var { yesterdaysRates } = this.state;

    const oldRates = yesterdaysRates.rates;

    for (let i = 0; i < oldRates.length; i++) {
      if (oldRates.at(i).code === item.code) {
        if (oldRates.at(i).mid > item.mid) {
          return <p className="fcr-value fcr-down">{item.code}</p>;
        } else if (oldRates.at(i).mid < item.mid) {
          return <p className="fcr-value fcr-up">{item.code}</p>;
        } else {
          return <p className="fcr-value fcr-same">{item.code}</p>;
        }
      }
    }
  }

  render() {
    var { isLoaded, todaysRates } = this.state;

    if (isLoaded) {
      const currentRates = todaysRates.rates;

      return (
        <div>
          <ul className="fcr-currency-list">
            <li className="fcr-currency-pln">
              <div className="fcr-currency-code pln">
                <img src={PLN} alt="PLN" height={"30px"}></img>
                <p className="fcr-value pln">PLN</p>
              </div>
              <div className="fcr-currency-value pln">1</div>
            </li>
            {currentRates.map((item) => (
              <li className="fcr-currency" key={item.code}>
                <div className="fcr-currency-code">
                  <img
                    src={require(`../../icons/${item.code}.svg`)}
                    alt={item.code}
                    height={"30px"}
                  />
                  {this.currencyDifference(item)}
                </div>
                <div className="fcr-currency-value">
                  {Math.round(item.mid * 100000) / 100000}
                </div>
              </li>
            ))}
          </ul>

          <p className="fcr-date">Updated: {todaysRates.effectiveDate}</p>
        </div>
      );
    }
  }
}

export default ForeignCurrenciesRates;
