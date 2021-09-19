import React from 'react';
import './products-list.css';
import ProductsListItem from "../products-list-item/products-list-item";
export default function ProductsList({ products }) {
  return (
    <div>
      <button>Добавить продукт</button>
      <div className={'product-list__container'}>
        {products.map((product) => <ProductsListItem key={product.id} product={product} />)}
      </div>
    </div>
  );
}