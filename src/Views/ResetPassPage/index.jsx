import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import 'sweetalert2/dist/sweetalert2.min.css';
import { sendEmail, resetPass } from '../../Config/mongoDb';
import { useNavigate } from 'react-router-dom';

function PasswordResetPage() {

  const [showPassInput, setShowPassInput] = useState(false);
  const [otp, setOtp] = useState(null);
  const [email, setEmail] = useState(null);
  const [passChecked, setPassChecked] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const lsdata = localStorage.getItem('otp');
    const data = JSON.parse(lsdata);

    if(data){
      setOtp(data.code);
      setEmail(data.email);
      setPassChecked(data.passChecked);
    };

    if(data?.passChecked){
      setShowPassInput(true);
    };

  }, []);
  
  const resetForm = async (e) => {
    e.preventDefault();

    try {

      if(!showPassInput){
        if (!otp) {
          const code = Math.ceil(Math.random() * 8999) + 1000;
  
          const res = await sendEmail(e.target[0].value, code);
  
          if (res.complete) {

            setEmail(e.target[0].value);

            localStorage.setItem('otp', JSON.stringify({
              email: e.target[0].value,
              code,
              passChecked: false
            }));
  
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

            localStorage.setItem('otp', JSON.stringify({
              email,
              code: otp,
              passChecked: true
            }));
    
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

            navigate('/login');

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
            <input className="input" type="email" value={email} disabled={email && true} placeholder="Email" required />
            <br />
            {passChecked ? 
            <input className="input" type='number' disabled={passChecked != null ? passChecked : true} value={otp} placeholder="One time password" required />
            :
            <input className="input" type='number' disabled={passChecked != null ? passChecked : true} placeholder="One time password" required />
            }
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
