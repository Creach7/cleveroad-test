import React from 'react';
import './products-list.css';
import ProductsListItem from "../products-list-item/products-list-item";
import { connect } from 'react-redux';

import { getProducts } from '../../firebase/firebase';

import { productsUpdate } from '../../redux/actions';

function ProductsList({ products, productsUpdate }) {
  // console.dir(getProducts());
  productsUpdate(getProducts());
  return (
    <div>
      <button>Добавить продукт</button>
      <div className={'product-list__container'}>
        {products.map((product) => <ProductsListItem key={product.id} product={product} />)}
      </div>
    </div>
  );
}

const mapStateToProps = ({ products }) => {
  return {
    products
  };
}

const mapDispatchToProps = {
  productsUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);