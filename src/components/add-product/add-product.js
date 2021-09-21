import './add-pruduct.css';
import React from 'react';

import { connect } from 'react-redux';

import { pageChanged } from '../../redux/actions';
import { addProduct } from '../../firebase/firebase';

function AddProduct({ user, pageChanged }) {
  const getMinDate = () => {
    const D = new Date();
    D.setDate(D.getDate() + 1);
    const dateCheck = (date) => {
      return (date < 10) ? `0${date}` : date;
    }
    return `${D.getFullYear()}-${dateCheck(D.getMonth() + 1)}-${dateCheck(D.getDate())}`
  }
  const disRef = React.createRef();
  const onSubmit = (e) => {
    e.preventDefault();
    // console.dir(e);
    const product = {
      heading: e.target[0].value,
      photo: e.target[1].files[0],
      description: e.target[2].value,
      price: e.target[3].value,
      discount_percent: e.target[4].value,
      discount_end_date: e.target[5].value,
      user_id: user.uid
    }
    addProduct(product, () => { pageChanged('ProductsList') });
  }
  return (
    <div className={'add-product__page'}>
      <button className='add-product__close_button' onClick={() => pageChanged('ProductsList')}>✖</button>
      <form className='add-product__container' onSubmit={onSubmit}>
        <p>Заголовок</p>
        <input name='heading' type="text" required minLength='20' maxLength='40' />
        <p>Фото</p>
        <input name='photo' type='file' alt='image' required accept='image/*' onChange={
          (e) => {
            const imgCheck = (wh) => (wh >= 200 && wh <= 4000);
            const fr = new FileReader();
            fr.onload = () => {
              const img = new Image();
              img.onload = () => {
                if (!imgCheck(img.width) || !imgCheck(img.height)) {
                  alert('Ширина и высота изображения должны быть больше 200 и меньше 4000');
                  e.target.value = '';
                }
              };
              img.src = fr.result;
            };
            fr.readAsDataURL(e.target.files[0]);
          }
        } />
        <p>Описание</p>
        <textarea name='description' type='text' maxLength='200' />
        <p>Цена</p>
        <input name='price' type='number' required step="0.01" min='0' max='99999999.99' />
        <p>Скидка</p>
        <input name='discount-percent' type='number' min='10' max='90' onChange={
          (e) => {
            if ((e.target.value !== '') !== (disRef.current.required)) {
              disRef.current.required = (e.target.value !== '');
            }
          }
        } />
        <p>Дата окончания скидки</p>
        <input name='discount-end-date' type='date' min={getMinDate()} ref={disRef} />
        <button>Добавить продукт</button>
      </form>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
}

const mapDispatchToProps = {
  pageChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);