import React, { useEffect } from 'react';
import './products-list.css';
import ProductsListItem from "../products-list-item/products-list-item";
import { connect } from 'react-redux';

import { getProducts } from '../../firebase/firebase';

import { productsUpdate, pageChanged } from '../../redux/actions';

function ProductsList({ products, productsUpdate, pageChanged }) {
  getProducts(productsUpdate);
  useEffect(() => {
    console.log('ProductsList');

  }, []);
  return (
    <div className={'product-list__page'}>
      <button className={'product-list__button'} onClick={() => { pageChanged('AddProduct') }}>Добавить продукт</button>
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
  productsUpdate,
  pageChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);