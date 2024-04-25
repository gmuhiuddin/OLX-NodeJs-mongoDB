import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../store/userInfoSlice';
import './style.css';

function UserInfoCart({ userEmail, setUserInfoCartView }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function logoutFunc() {
            dispatch(removeUser());
            setUserInfoCartView(false);
            window.location.reload();
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