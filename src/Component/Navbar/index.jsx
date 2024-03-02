import React, { useEffect, useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import UserInfoCart from '../UserInfoCart';
import { useNavigate } from 'react-router-dom';
import SmallLoader from '../SmallLoader';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const [userInfoCartView, setUserInfoCartView] = useState(false);
  const [userData, setUserData] = useState();
  const [loader, setLoader] = useState(true);
  const res = useSelector(res => res.userSlice.userInfo);
  const navigate = useNavigate();
  
  useEffect(() => {
    setUserData(res?.userData);
    
    if (res?.userData) {
      setLoader(false);
    };
    if(res?.userData == false){
      setLoader(false);
    };
  }, [res])

  return (
    <div>
      <nav className="navbar">
        <img className='logo' onClick={() => window.location.pathname = '/'} alt='logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1AqNs6Rez3QHmfXdLLVj8mVpPOfvPqs3Ak0wo2_0Nm4BZk-yc' />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', width: '81vw' }}>
            <div className='select-container'>
              <FontAwesomeIcon style={{ fontSize: 23, cursor: 'pointer' }} icon={faMagnifyingGlass} />
              <select className='select'>
                <option>Pakistan</option>
                <option disabled>CHOOSE REGION</option>
                <option>Azad Kashmir, Pakistan</option>
                <option>Balochistan, Pakistan</option>
                <option>Islamabad, Pakistan</option>
                <option>Khybar Pakhtunkhaw, Pakistan</option>
                <option>Northern Areas, Pakistan</option>
                <option>Punjab, Pakistan</option>
                <option>Sindh, Pakistan</option>
              </select>
            </div>
            <input className='input' placeholder='Find Cars, Mobiles Phone and more...' />
            <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />

            <div style={{ display: 'flex', alignItems: 'center' }}>
              {loader ?
                <SmallLoader /> :
                userData ?
                  <div>
                    <span onClick={() => setUserInfoCartView(!userInfoCartView)} style={{ cursor: 'pointer', fontSize: 25, marginLeft: 7, fontWeight: '500' }} >{userData.firstname + ' ' + userData.lastname}</span>
                  </div>
                  :
                  <div>
                    <span className='login-txt' onClick={() => {
                      navigate('/login')
                    }}>Login</span>
                  </div>
              }

              <div onClick={() => {
                userData ? navigate('/addsellpost') : navigate('/login')
              }} className='btn-container'>
                <img src='https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg' />
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span style={{ fontSize: 37, marginBottom: 7 }}>+</span> SELL</span>
              </div>
            </div>

          </div>
        </div>
        <br />
      </nav>
      {userInfoCartView ? <span>
        <UserInfoCart setUserInfoCartView={setUserInfoCartView} userEmail={userData?.userEmail} />
        <br />
        <br />
        <br />
        <br />
        <br />

      </span>
        : ''}
    </div>
  );
};

export default Navbar;
