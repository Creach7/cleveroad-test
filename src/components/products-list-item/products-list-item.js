import React from 'react';
import './products-list-item.css';
export default function ProductsListItem(props) {
  const { heading = '', photo = '', description = '', price = '', discount_percent = '', discount_end_date = '' } = props;
  const Days = Math.floor(((new Date(discount_end_date)).getTime() - (new Date()).getTime()) / (1000 * 60 * 60 * 24));
  const flag = (discount_percent !== '' && Days >= 0);
  return (
    <div className={'products-list-item__container'}>
      <div className='products-list-item__photo-container'>
        <img className='products-list-item__photo' src={photo} alt={heading} />
      </div>
      <p>{heading}</p>
      <p>{description}</p>
      <p className={flag ? 'products-list-item__line-through' : ''}>{`${price}$`}</p>
      {
        flag ? <p>{`${price * ((100 - discount_percent) / 100)}$ (Осталось дней: ${Days + 1})`}</p> : ''
      }
    </div>
  )
}