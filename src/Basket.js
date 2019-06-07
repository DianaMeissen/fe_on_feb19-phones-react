import React from 'react';

class Basket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  render() {
    return (
      <section>
        <p>Shopping Cart</p>
        <ul>
          {this.state.items.length ? (this.state.items.map(item => {
            <li>item.name <button>x</button></li>
          })) : null}
        </ul>
      </section>
    );
  }

  addToList() {
    return this.state.items.add(this.props.selectedPhone);
  }
};

export default Basket;
