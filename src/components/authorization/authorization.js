import React from 'react';
import { userUpdate, pageChanged } from '../../redux/actions';
import { connect } from 'react-redux';

import { signIn, create } from '../../firebase/firebase';

import './authorization.css';

function Authorization({ userUpdate, pageChanged }) {
  const onSubmit = (e) => {
    e.preventDefault();
    console.dir(e);
    const successFun = (user) => {
      // console.dir(user);
      userUpdate(user);
      pageChanged('ProductsList')
    }
    switch (e.nativeEvent.submitter.name) {
      case 'signIn':

        const errorFun = () => {
          alert('Неправельный email или пароль');
        }
        signIn(e.target[0].value, e.target[1].value, successFun, errorFun);
        break;
      case 'create':
        const errorFun2 = () => {
          alert('Ошибка регистрации');
        }
        create(e.target[0].value, e.target[1].value, successFun, errorFun2);
        break;
      default:
        break;
    }
  }
  return (
    <div className={'authorization__page'}>
      <form onSubmit={onSubmit}>
        <p>Email</p>
        <input name='email' type='email' required />
        <p>Password</p>
        <input name='password' type='password' required />
        <button name='signIn'>Войти</button>
        <button name='create'>Зарегестрироватся</button>
      </form>
    </div>
  );
}
const mapStateToProps = () => {
  return {

  };
}
const mapDispatchToProps = {
  userUpdate,
  pageChanged
}
export default connect(mapStateToProps, mapDispatchToProps)(Authorization);