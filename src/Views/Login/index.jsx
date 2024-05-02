import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import { login } from '../../Config/mongoDb'
import { setUser, removeUser } from '../../store/userInfoSlice';
import './style.css'
import { useRef } from 'react';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sbtBtn = useRef(null);

    async function loginForm(e) {
        e.preventDefault();
        sbtBtn.current.disabled = true;

        try {
            const result = await login(e.target[0].value, e.target[1].value);

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
            dispatch(removeUser());
            sbtBtn.current.disabled = false;
            e.target[1].value = '';
        };
    };

    return (
        <div>
            <div className='container'>
                <div className="login-container">
                    <br />

                    <span>Login</span>
                    <br />
                    <br />

                    <form onSubmit={loginForm}>
                        <br />
                        <input type="email" placeholder="Email" required />
                        <br />
                        <input minLength="8" placeholder="Password" type="password" required />
                        <br />
                        <button ref={sbtBtn} type="submit">Login</button>
                    </form>
                    <a onClick={() => navigate('/prp')} className='forgot-pass-txt'>Forgot password?</a>
                    <p className='dont-acc-txt'>You don`t have an account <a onClick={() => navigate('/signup')}>Sign Up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;