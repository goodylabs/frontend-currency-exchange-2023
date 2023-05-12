import React, { Component } from 'react';
import './style.css'

class GoldPrices extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('http://api.nbp.pl/api/cenyzlota/last/30/')
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json,
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
      return (
        <div>
          <p>
            <span>Gold</span> prices
          </p>
            <ul>
              {items.map(item => (
                <li key={item.data}>
                  {item.data} {item.cena}
                </li>
              ))}
            </ul>
        </div>
      );
    }
  }
}

export default GoldPrices;