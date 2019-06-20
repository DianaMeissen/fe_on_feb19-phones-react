import React from 'react';
import axios from 'axios';

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

  setBasketItems = (phoneId) => {
    let array = [...this.state.basketItems];
    if (this.state.basketItems.phoneId === phoneId) {
      let index = array.indexOf(array.phoneId === phoneId);
      array[index].conut += 1;
      this.setState({
        basketItems: array})
    } else {
      this.setState({
        basketItems: [...this.state.basketItems, {"phoneId": phoneId, "count": 1}]})
    }
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
  }

  getPhoneById = (phoneId) => {
    return (
      axios.get(`https://mate-academy.github.io/phone-catalogue-static/api/phones/` + phoneId + `.json`)
      .then(res => {
        this.setState({ selectedPhone: res.data });
      })
    )
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
              />
            </div>

            <div className="col-md-10">
              {this.state.selectedPhone ? (
                <Viewer
                  setBasketItems={this.setBasketItems}
                  phone={this.state.selectedPhone}
                  onBack={() => {
                    this.setState({
                      selectedPhone: null,
                    });
                  }}
                />
              ) : (
                  <Catalog
                    setBasketItems={this.setBasketItems}
                    phones={this.state.phones}
                    onPhoneSelected={(phoneId) => {
                        this.getPhoneById(phoneId)
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
