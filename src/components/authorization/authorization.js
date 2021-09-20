import React from 'react';
import { userUpdate, pageChanged } from '../../redux/actions';
import { connect } from 'react-redux';

import { signIn } from '../../firebase/firebase';

function Authorization({ userUpdate, pageChanged }) {
  const onSubmit = (e) => {
    e.preventDefault();
    const successFun = (user) => {
      // console.dir(user);
      userUpdate(user);
      pageChanged('ProductsList')
    }
    const errorFun = () => {
      alert('Неправельный email или пароль');
    }
    signIn(e.target[0].value, e.target[1].value, successFun, errorFun);
  }
  return (
    <form style={{
      'display': 'flex',
      'flexDirection': 'column'
    }} onSubmit={onSubmit}>
      <p>Email</p>
      <input name='email' type='email' required />
      <p>Password</p>
      <input name='password' type='password' required />
      <button>Sign in</button>
    </form>
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