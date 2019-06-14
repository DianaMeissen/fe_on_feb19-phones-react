import React from 'react';
import axios from 'axios';

import { getById } from './api/phone'
import Basket from './Basket'
import Filter from './Filter'
import Catalog from './Catalog'
import Viewer from './Viewer'

import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phones: [],
      selectedPhone: null,
      basketItems: [],
    }
  }

/*  componentWillMount() {
    localStorage.getItem('basketItems') && this.setState({
      basketItems: localStorage.getItem('basketItems')
    });
  }*/

  componentWillUpdate = (nextProps, nextState) => {
    console.log(this.state.basketItems);
    localStorage.getItem('basketItems') && localStorage.setItem('basketItems', this.state.basketItems)
    console.log(this.state.basketItems);
    localStorage.setItem('basketItemsDate', Date.now());
  }

  updateData = (value) => {
    this.setState({
      basketItems: [...this.state.basketItems , value]})
  }

  deleteData = (value) => {
    const array=[...this.state.basketItems];
    array.splice(array.indexOf(value), 1);
    this.setState({basketItems: array})
  }
  
  countSameEls = (value) => {
    let result = 0;
    this.state.basketItems.map(item => (item === value) ? (result += 1) : null)
    return result
  }

  componentDidMount() {
    axios.get(`https://mate-academy.github.io/phone-catalogue-static/api/phones.json`)
    .then(res => {
      this.setState({ phones: res.data });
    })
    
    const date = localStorage.getItem('phones');
    const basketItemsDate = date && new Date(parseInt(date));
    const now = new Date();
    const dataAge = Math.round((now - basketItemsDate) / (1000 * 60));

    dataAge >= 15 && localStorage.setItem('basketItems', this.state.basketItems)
  }
  
  render() {
    localStorage.setItem('basketItems', this.state.basketItems);
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <Filter />
              <Basket 
                items={[...new Set(this.state.basketItems)]}
                deleteData={this.deleteData}
                countSameEls={this.countSameEls}
              />
            </div>

            <div className="col-md-10">
              {this.state.selectedPhone ? (
                <Viewer
                  updateData={this.updateData}
                  countSameEls={this.countSameEls}
                  phone={this.state.selectedPhone}
                  onBack={() => {
                    this.setState({
                      selectedPhone: null,
                    });
                  }}
                />
              ) : (
                  <Catalog
                    updateData={this.updateData}
                    countSameEls={this.countSameEls}
                    phones={this.state.phones}
                    onPhoneSelected={(phoneId) => {
                      this.setState({
                        selectedPhone: getById(phoneId),
                      });
                    }}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
