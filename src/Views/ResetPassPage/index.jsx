import React, { useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import 'sweetalert2/dist/sweetalert2.min.css';
import { sendEmail, resetPass } from '../../Config/mongoDb';

function PasswordResetPage() {

  const [showPassInput, setShowPassInput] = useState(false);
  const [otp, setOtp] = useState(null);

  const resetForm = async (e) => {
    e.preventDefault();

    try {

      if(!showPassInput){
        if (!otp) {
          const code = Math.ceil(Math.random() * 8999) + 1000;
  
          const res = await sendEmail(e.target[0].value, code);
  
          if (res.complete) {
  
            Swal.fire({
              title: "Email send successfully",
              text: "email send successfully",
              icon: "success"
            });
  
            setOtp(code);
  
            e.target[0].disabled = true;
            e.target[1].disabled = false;
          } else {
            Swal.fire({
              title: "Email Not Found",
              text: "Sorry, we couldn't find that email address.",
              icon: "error"
            });
          };
        }else{
  
          if (otp == e.target[1].value) {
            setShowPassInput(true);
    
            e.target[0].disabled = true;
            e.target[1].disabled = true;
            
          }else{
            Swal.fire({
              title: "Incorrect Otp",
              text: 'Incorrect Otp',
              icon: "error" // You can use "warning" as well
            });
          };

        };
      }else{

        if(e.target[2].value == e.target[3].value){

          const res = await resetPass(e.target[0].value, e.target[3].value)

          if(res.complete){
            Swal.fire({
              title: "Password reset successfully",
              text: "Password reset successfully",
              icon: "success"
            });
            window.location.pathname = '/login';
          }else{
            Swal.fire({
              title: res.msg,
              text: res.msg,
              icon: "success"
            });
          }
          
        }else{
          e.target[3].value = '';
        };
      };

    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error" // You can use "warning" as well
      });
    }
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
            <input className="input" type="email" disabled={false} placeholder="Email" required />
            <br />
            <input className="input" type="number" disabled={true} placeholder="One time password" required />
            <br />
            {showPassInput &&
              <>
                <input className="input" type="password" placeholder="Password" required />
                <br />
                <input className="input" type="password" placeholder="Repeat password" required />
              </>
            }
            <button type="submit">{!showPassInput ? 'Send otp on email' : 'Reset password'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
