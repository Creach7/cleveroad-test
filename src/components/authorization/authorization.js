import React from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default function Authorization() {
  const onSubmit = (e) => {
    e.preventDefault();
    // console.dir(e);
    // console.log(e.target[0].value);
    // console.log(e.target[1].value);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, e.target[0].value, e.target[1].value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.dir(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Неправельный email или пароль');
      });
  }
  return (
    <form style={{
      'display': 'flex',
      'flexDirection': 'column'
    }} onSubmit={onSubmit}>
      <label>Email</label>
      <input name='email' type='email' required />
      <label>Password</label>
      <input name='password' type='password' required />
      <button>Sign in</button>
    </form>
  );
}