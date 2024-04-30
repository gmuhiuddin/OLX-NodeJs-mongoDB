import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/userInfoSlice';
import { logout } from '../../Config/mongoDb';
import './style.css';

function UserInfoCart({ userEmail, setUserInfoCartView }) {

    const dispatch = useDispatch();

    async function logoutFunc() {

        const res = await logout()
        
        if(res.msg == 'user logout successfully'){
            dispatch(removeUser());
            setUserInfoCartView(false);
            window.location.reload();
        }else{
            console.log(res.msg);
        }
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