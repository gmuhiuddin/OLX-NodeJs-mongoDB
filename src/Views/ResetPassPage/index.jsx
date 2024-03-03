import React from 'react';
import { resetPass } from '../../Config/mongoDb';

function PasswordResetPage() {

  const resetForm = async (e) => {
    e.preventDefault();

    resetPass(e.target[0].value)
    .then((a) => {
      alert('Send your password reset link on your given email');
      window.location.pathname = '/';
    })
    .catch(err => {
      console.log(err);
    })

    e.target[0].value = '';
  };

  return (
    <div>
      <div className='container'>
        <div className="login-container">
          <br />

          <span>Reset Password</span>
          <br />
          <br />

          <form onSubmit={resetForm}>
            <br />
            <input className="input" type="email" placeholder="Email" required />
            <br />
            <button type="submit">Reset password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
