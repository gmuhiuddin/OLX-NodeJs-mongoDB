import './style.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../Config/mongoDb'
import { setUser, removeUser } from '../../store/userInfoSlice';
import { useRef, useState } from 'react';

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sbtBtn = useRef(null);

    async function signUporm(e) {
        e.preventDefault();
        sbtBtn.current.disabled = true;

        if (e.target[3].value == e.target[4].value) {

            try {
                const result = await signUp(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value);

                if (result.data) {

                    const data = { ...result.data };

                    delete data.cartsIdForBasket;

                    dispatch(setUser({
                        ...data,
                        user: true
                    }));

                    Swal.fire({
                        title: "Successfully Logged in",
                        text: "Successfully Logged in",
                        icon: "success"
                    });

                    navigate('/');

                } else {
                    Swal.fire({
                        title: "Error",
                        text: result.msg,
                        icon: "error"
                    });
                    sbtBtn.current.disabled = false;

                }


            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error"
                });
                sbtBtn.current.disabled = false;
                dispatch(removeUser());
            };

        } else {
            e.target[4].style.boxShadow = '0px 0px 7px rgb(255, 0, 0)';
            e.target[4].value = '';
        }
    };

    return (
        <div>
            <div className='container'>
                <div className="sign-up-container">
                    <span>Sign Up</span>
                    <form onSubmit={signUporm}>
                        <br />
                        <input minlength="3" className="input" type="text" placeholder="First Name" required />
                        <br />
                        <input minlength="3" className="input" type="text" placeholder="Last Name" required />
                        <br />
                        <input className="input" type="email" placeholder="Email" required />
                        <br />
                        <input className="input" minlength="8" placeholder="Password" type="password" required />
                        <br />
                        <input className="input" onChange={(e) => e.target.style.boxShadow = '0px 0px 7px rgb(0, 0, 0)'} minlength="8" placeholder="Repeat Password" type="password" required />
                        <br />
                        <button ref={sbtBtn} type="submit" >Sign up</button>
                    </form>
                    <p className='have-acc-txt'>You have an account <a onClick={() => navigate('/login')} >Login</a></p>
                </div>
            </div>
        </div>
    )
};

export default SignUp;