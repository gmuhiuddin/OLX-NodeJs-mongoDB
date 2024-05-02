import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function SmallNavbar({userData}) {
    const navigate = useNavigate();

    return (
        <div className="small-navbar">
            <div style={{ display: 'flex' }}>
                <div onClick={() => navigate('/')} className='back-btn'>
                    <FontAwesomeIcon style={{ fontSize: 31, color: 'rgb(50, 50, 50)' }} icon={faArrowLeft} />
                </div>
                <img onClick={() => navigate('/')} className='olx-image' src='https://www.olx.com.pk/assets/logo_noinline.1cdf230e49c0530ad4b8d43e37ecc4a4.svg' />
            </div>
            <div style={{ marginRight: 39 }}>
                
                    {userData.user ? <span style={{ fontSize: 25, marginLeft: 7, fontWeight: '500' }} >{userData.firstname + ' ' + userData.lastname}</span> : <span className='login-txt' onClick={() => {
                        navigate('/login')
                    }}>Login</span>
                   }
            </div>
        </div>
    );
};

export default SmallNavbar;