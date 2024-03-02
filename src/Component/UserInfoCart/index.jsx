import './style.css';
import { removeUser } from '../../store/userInfoSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserInfoCart({ userEmail, setUserInfoCartView }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function logoutFunc() {
            dispatch(removeUser());
            setUserInfoCartView(false);
            navigate('/');
    };

    return (
        <div className='user-info-cart'>
            <span className='email-txt'>Email: {userEmail}</span>
            <br />
            <a className='logout-anchor' onClick={logoutFunc}>Logout</a>
        </div>
    )

};

export default UserInfoCart;