import React from "react";
import axios from "axios";

import Basket from "./Basket";
import Filter from "./Filter";
import Catalog from "./Catalog";
import Viewer from "./Viewer";

import "./App.css";

class App extends React.Component {
  state = {
    phones: [],
    selectedPhone: null,
    basketItems: []
  };

  saveToLocalSetState = state => {
    this.setState({ ...state }, () => {
      localStorage.setItem(
        "basketItems",
        JSON.stringify(this.state.basketItems)
      );
    });
  };

  addItemToBasket = phone => {
    let itemsArray = [...this.state.basketItems];
    let index = itemsArray.findIndex(item => item.id === phone.id);
    if (index === -1) {
      this.saveToLocalSetState({
        basketItems: [
          ...itemsArray,
          { id: phone.id, name: phone.name, count: 1 }
        ]
      });
    } else {
      let item = itemsArray[index];
      item.count++;
      itemsArray[index] = item;
      this.saveToLocalSetState({
        basketItems: itemsArray
      });
    }
  };

  deleteData = value => {
    let array = [...this.state.basketItems];
    let index = array.indexOf(value);
    if (array[index].count === 1) {
      array.splice(array.indexOf(value), 1);
    } else {
      array[index].count--;
    }
    this.saveToLocalSetState({ basketItems: array });
  };

  componentDidMount() {
    this.setState({
      basketItems: JSON.parse(localStorage.getItem("basketItems"))
    });
    axios
      .get(
        `https://mate-academy.github.io/phone-catalogue-static/api/phones.json`
      )
      .then(res => {
        this.setState({ phones: res.data });
      });
  }

  getPhoneById = phoneId => {
    axios
      .get(
        `https://mate-academy.github.io/phone-catalogue-static/api/phones/` +
          phoneId +
          `.json`
      )
      .then(res => {
        this.setState({ selectedPhone: res.data });
      });
  };

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
              />
            </div>

            <div className="col-md-10">
              {this.state.selectedPhone ? (
                <Viewer
                  addItemToBasket={this.addItemToBasket}
                  phone={this.state.selectedPhone}
                  onBack={() => {
                    this.setState({
                      selectedPhone: null
                    });
                  }}
                />
              ) : (
                <Catalog
                  addItemToBasket={this.addItemToBasket}
                  phones={this.state.phones}
                  onPhoneSelected={phoneId => {
                    this.getPhoneById(phoneId);
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
