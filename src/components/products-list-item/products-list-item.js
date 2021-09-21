import React from 'react';
import './products-list-item.css';
import { connect } from 'react-redux';

import { deleteProduct } from '../../firebase/firebase';
import { pageChanged, editProduct } from '../../redux/actions';

function ProductsListItem({ product, user, pageChanged, editProduct }) {
  const { heading = '', photo = '', description = '', price = '', discount_percent = '', discount_end_date = '', user_id = '' } = product;
  const Days = Math.floor(((new Date(discount_end_date)).getTime() - (new Date()).getTime()) / (1000 * 60 * 60 * 24));
  const flag = (discount_percent !== '' && Days >= 0);

  const editThisProduct = () => {
    editProduct(product);
    pageChanged('EditProduct');
  }
  const deleteThisProduct = () => {
    const res = photo.match(/image\..+\?/)[0].split('.').pop();
    if (window.confirm('Вы уверены что хотите удалить продукт?')) {
      deleteProduct(product.id, res.substring(0, res.length - 1));
      pageChanged('ProductsList');
    }
  }
  const floor = (num) => {
    return Math.floor(100 * num) / 100;
  }
  return (
    <div className={'products-list-item__container'}>
      {
        (user_id === user.uid) ?
          (<div className="dropdown">
            <button className="dropbtn">⚙</button>
            <div className="dropdown-content">
              <button onClick={editThisProduct}>Редактировать</button>
              <button onClick={deleteThisProduct}>Удалить</button>
            </div>
          </div>) : ''
      }
      <div className='products-list-item__photo-container'>
        <img className='products-list-item__photo' src={photo} alt={heading} />
      </div>
      <p className={'products-list-item__heading'}>{heading}</p>
      <p className={'products-list-item__description'}>{description}</p>
      <div className={'products-list-item__price-container'}>
        <p className={flag ? 'products-list-item__line-through' : ''}>{`${floor(price)}$`}</p>
        {
          flag ? <p style={{ paddingLeft: '10px' }}>{`${floor(price * ((100 - discount_percent) / 100))}$ (Осталось дней: ${Days + 1})`}</p> : ''
        }
      </div>
    </div >
  )
}
const mapStateToProps = ({ user }) => {
  return {
    user
  };
}
const mapDispatchToProps = {
  pageChanged,
  editProduct
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsListItem);