import './add-pruduct.css';
import React from 'react';

export default function AddProduct() {
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
    // e.preventDefault();
    console.dir(e);
  }
  return (
    <form className='container' onSubmit={onSubmit}>
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
      <input name='price' type='number' required min='0' max='99999999.99' />
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
  );
}