import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import UserInfoCart from '../UserInfoCart';
import SmallLoader from '../SmallLoader';
import { getUserInfo } from '../../Config/mongoDb.jsx';
import './style.css';

const Navbar = () => {

  const [userInfoCartView, setUserInfoCartView] = useState(false);
  const [userData, setUserData] = useState();
  const [loader, setLoader] = useState(true);
  const res = useSelector(res => res.userSlice.userInfo);
  const navigate = useNavigate();

  useEffect(() => {

    getUserData();

  }, [res])

  const getUserData = async () => {
    const userd = await getUserInfo(res?.userId);

    setUserData(userd.data);

    if (res) {
      setLoader(false);
    };
  };

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

            {loader ?
              <SmallLoader /> :
              userData ?
                <div>
                  <span onClick={() => setUserInfoCartView(!userInfoCartView)} style={{ cursor: 'pointer', fontSize: 23, display: "block", width: "219px", marginRight: 15, marginLeft: 5, overflowWrap: "break-word", fontWeight: '500' }} >{userData.firstname + ' ' + userData.lastname}</span>
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
        <br />
      </nav>
      {userInfoCartView ?
      <>
       <span>
        <UserInfoCart setUserInfoCartView={setUserInfoCartView} userEmail={userData?.userEmail} />
      </span>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      </>
        : ''}
    </div>
  );
};

export default Navbar;
