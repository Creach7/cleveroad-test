import './edit-product.css';
import React from 'react';

import { connect } from 'react-redux';

import { pageChanged } from '../../redux/actions';
import { updateProduct, deleteImage, loadImage } from '../../firebase/firebase';

function EditProduct({ productInfo, pageChanged }) {
  const { id = '', heading = '', photo = '', description = '', price = '', discount_percent = '', discount_end_date = '' } = productInfo;
  const getMinDate = () => {
    const D = new Date();
    D.setDate(D.getDate() + 1);
    const dateCheck = (date) => {
      return (date < 10) ? `0${date}` : date;
    }
    return `${D.getFullYear()}-${dateCheck(D.getMonth() + 1)}-${dateCheck(D.getDate())}`
  }
  const disRef = React.createRef();

  const isChanged = {
    heading: false,
    photo: false,
    description: false,
    price: false,
    discount_percent: false,
    discount_end_date: false,
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const update = {};
    if (isChanged.heading) {
      update.heading = e.target[0].value;
    }
    if (isChanged.photo) {
      update.photo = e.target[1].files[0];
    }
    if (isChanged.description) {
      update.description = e.target[2].value;
    }
    if (isChanged.price) {
      update.price = e.target[3].value;
    }
    if (isChanged.discount_percent) {
      update.discount_percent = e.target[4].value;
    }
    if (isChanged.discount_end_date) {
      update.discount_end_date = e.target[5].value;
    }

    if (isChanged.photo) {
      deleteImage(id);
      loadImage(id, update.photo, function (photoUrl) {
        console.log(update);
        updateProduct(id, {
          ...update,
          photo: photoUrl
        });
      });
    } else {
      updateProduct(id, update);
    }
    pageChanged('ProductsList');
  }
  return (
    <div className={'edit-product__page'}>
      <button className='edit-product__close_button' onClick={() => pageChanged('ProductsList')}>✖</button>
      <form className='edit-product__container' onSubmit={onSubmit}>
        <p>Заголовок</p>
        <input name='heading' defaultValue={heading} type="text" required minLength='20' maxLength='40' onChange={() => isChanged.heading = true} />
        <p>Фото</p>
        <a href={photo} target="_blank" rel="noreferrer">Фото сейчас</a>
        <input name='photo' type='file' alt='image' accept='image/*' onChange={
          (e) => {
            const imgCheck = (wh) => (wh >= 200 && wh <= 4000);
            const fr = new FileReader();
            fr.onload = () => {
              const img = new Image();
              img.onload = () => {
                if (!imgCheck(img.width) || !imgCheck(img.height)) {
                  alert('Ширина и высота изображения должны быть больше 200 и меньше 4000');
                  e.target.value = '';
                } else {
                  isChanged.photo = true;
                }
              };
              img.src = fr.result;
            };
            fr.readAsDataURL(e.target.files[0]);
          }
        } />
        <p>Описание</p>
        <textarea name='description' defaultValue={description} type='text' maxLength='200' onChange={() => isChanged.description = true} />
        <p>Цена</p>
        <input name='price' defaultValue={price} type='number' required step="0.01" min='0' max='99999999.99' onChange={() => isChanged.price = true} />
        <p>Скидка</p>
        <input name='discount-percent' defaultValue={discount_percent} type='number' min='10' max='90' onChange={
          (e) => {
            if ((e.target.value !== '') !== (disRef.current.required)) {
              disRef.current.required = (e.target.value !== '');
            }
            isChanged.discount_percent = true;
          }
        } />
        <p>Дата окончания скидки</p>
        <input name='discount-end-date' defaultValue={discount_end_date} type='date' min={getMinDate()} ref={disRef} onChange={() => isChanged.discount_end_date = true} />
        <button>Изменить</button>
      </form>
    </div>
  );
}

const mapStateToProps = ({ productInfo }) => {
  return {
    productInfo
  };
}

const mapDispatchToProps = {
  pageChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);