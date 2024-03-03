import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './style.css'
import { login } from '../../Config/mongoDb'
import { setUser, removeUser } from '../../store/userInfoSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function loginForm(e) {
        e.preventDefault();

        try {
            const result = await login(e.target[0].value, e.target[1].value);
            
            if(result.data){
                dispatch(setUser({
                    userId: result.data._id,
                    userData: result.data,
                    user: true
                }));
            navigate('/');
            }else{
                alert(result.msg)
            }
        } catch (error) {
            alert(error.message);
            dispatch(removeUser());
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
                        <input className="input" type="email" placeholder="Email" required />
                        <br />
                        <input className="input" minLength="8" placeholder="Password" type="password" required />
                        <br />
                        <button type="submit">Login</button>
                    </form>
                    <a href='/passresetpage' className='forgot-pass-txt'>Forgot password?</a>
                    <p style={{ fontSize: 21 }}>You don`t have an account <a style={{ textDecoration: 'underline', color: 'rgb(128, 25, 207)', cursor: 'pointer' }} onClick={() => navigate('/signup')}>Sign Up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;