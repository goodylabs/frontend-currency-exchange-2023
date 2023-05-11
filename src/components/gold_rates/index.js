import React, { Component } from 'react';
import './style.css'

class GoldRates extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('http://api.nbp.pl/api/cenyzlota/last/100/')
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
      return (
        <div className='container'>
        <p className='title'>
          <span>Gold</span> prices
        </p>
          <ul className='list'>
            {items.map(item => (
              <li className='list-item' key={item.data}>
                {item.data} {item.cena}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default GoldRates;