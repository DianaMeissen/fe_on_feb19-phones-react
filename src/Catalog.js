import React from 'react';
import Basket from './Basket'

const Catalog = (props) => {
  return (
    <ul className="phones">
      {props.phones.map(phone => (
        <li className="thumbnail" key={phone.id} >
          <a
            href={'#' + phone.id}
            className="thumb"
            onClick={() => {
              props.onPhoneSelected(phone.id)
            }}
          >
            <img
              alt={phone.name}
              src={phone.imageUrl}
            />
          </a>

          <div className="phones__btn-buy-wrapper">
            <a
              className="btn btn-success"
              onClick={() => {
              }}>
              Add
            </a>
          </div>

          <a
            href={'#' + phone.id}
            onClick={() => {
              props.onPhoneSelected(phone.id)
            }}
          >
            {phone.name}
          </a>

          <p>{phone.snippet}</p>
        </li>
      ))}
    </ul>
  );
};

export default Catalog;
