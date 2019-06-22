import React from "react";

const Basket = props => {
  const array = [...props.items];
  return (
    <section>
      <p>Shopping Cart</p>
      <ul>
        {array.length > 0
          ? array.map(item => (
              <li>
                {item.name}
                {item.count === 1 ? null : "(" + item.count + ")"}
                <button
                  style={{
                    fontSize: "10px",
                    backgroundColor: "Transparent",
                    border: "none"
                  }}
                  onClick={() => {
                    props.deleteData(item);
                  }}
                >
                  X
                </button>
              </li>
            ))
          : null}
      </ul>
    </section>
  );
};

export default Basket;
