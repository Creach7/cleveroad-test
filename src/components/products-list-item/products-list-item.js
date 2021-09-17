import React from 'react';
import './products-list-item.css';
export default function ProductsListItem(props) {
  const { heading = '', photo = '', description = '', price = '', discount_percent = '', discount_end_date = '' } = props;
  const Days = Math.floor(((new Date(discount_end_date)).getTime() - (new Date()).getTime()) / (1000 * 60 * 60 * 24));
  const flag = (discount_percent !== '' && Days >= 0);
  const JSXPrice = () => {
    console.log(Days);
    if (discount_percent !== '' && Days >= 0) {
      return (
        <div>
          <label style={{ textDecoration: 'line-through' }}>{price}</label>
          <label>{price * ((100 - discount_percent) / 100)}</label>
        </div>
      );
    } else {
      return (<label>{price}</label>);
    }

  }
  return (
    <div className={'products-list-item__container'}>
      <img className='products-list-item__photo' src={photo} alt={heading} />
      <label>{heading}</label>
      <label>{description}</label>
      <label className={flag ? 'products-list-item__line-through' : ''}>{`${price}$`}</label>
      {
        flag ? <label>{`${price * ((100 - discount_percent) / 100)}$ (Осталось дней: ${Days + 1})`}</label> : ''
      }
    </div>
  )
}