import React from 'react';
import './products-list-item.css';
export default function ProductsListItem({ product }) {
  const { heading = '', photo = '', description = '', price = '', discount_percent = '', discount_end_date = '' } = product;
  const Days = Math.floor(((new Date(discount_end_date)).getTime() - (new Date()).getTime()) / (1000 * 60 * 60 * 24));
  const flag = (discount_percent !== '' && Days >= 0);
  return (
    <div className={'products-list-item__container'}>
      <div className="dropdown">
        <button className="dropbtn">⚙</button>
        <div className="dropdown-content">
          <div>Редактировать</div>
          <div>Удалить</div>
        </div>
      </div>
      <div className='products-list-item__photo-container'>
        <img className='products-list-item__photo' src={photo} alt={heading} />
      </div>
      <p className={'products-list-item__heading'}>{heading}</p>
      <p className={'products-list-item__description'}>{description}</p>
      <div className={'products-list-item__price-container'}>
        <p className={flag ? 'products-list-item__line-through' : ''}>{`${price}$`}</p>
        {
          flag ? <p style={{ paddingLeft: '10px' }}>{`${price * ((100 - discount_percent) / 100)}$ (Осталось дней: ${Days + 1})`}</p> : ''
        }
      </div>
    </div >
  )
}