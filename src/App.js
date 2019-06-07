import React from 'react';

import { getAll, getById } from './api/phone'
import Basket from './Basket'
import Filter from './Filter'
import Catalog from './Catalog'
import Viewer from './Viewer'

import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phones: getAll(),
      selectedPhone: null,
      basketItems: [],
    }
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
    var result = 0;
    this.state.basketItems.map(item => (item === value) ? (result += 1) : null)
    return result
  }

  render() {
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
