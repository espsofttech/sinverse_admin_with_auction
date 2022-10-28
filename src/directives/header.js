import React, { Component, useEffect, useState } from 'react'
import { getAdminProfiles } from '../Action/action';
import config from '../coreFIles/config'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'

const Header = () => {
  const [usersList, setusersList] = useState('');
  const loginData = (!Cookies.get('loginSuccesssinverseAdmin')) ? [] : JSON.parse(Cookies.get('loginSuccesssinverseAdmin'));
  if (!loginData || loginData == '') {
    window.location.href = `${config.baseUrl}`;
  }

  useEffect(() => {
    getProfileAPI()
  },[])

  const logout = async () => {
    Cookies.remove('loginSuccesssinverseAdmin');
    window.location.href = config.baseUrl;
  }

  const getProfileAPI = async () => {
    let res = await getAdminProfiles({
        id: loginData?.id,
        email: loginData?.email,
    });
    if (res.success) {
        setusersList(res.data);
    }
};

  return (

    <>
      <header className="main-header">
        <div className="d-flex align-items-center logo-box justify-content-start">
          {/* Logo */}
          <a href={`${config.baseUrl}`} className="logo">
            {/* logo*/}
            <div className="logo-mini w-50">
              <span className="light-logo">
                <img src="./images/logo.png" alt="logo" />
              </span>
              <span className="dark-logo">
                <img src="./images/logo.png" alt="logo" />
              </span>
            </div>
            <div className="logo-lg">
              <span className="adminLogo">
                <img src="./images/logo.png" alt="logo" />
              </span>
            </div>
          </a>
        </div>
        {/* Header Navbar */}
        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button*/}
          <div className="app-menu">
            <ul className="header-megamenu nav">
              <li className="btn-group nav-item">
                <a
                  href="#"
                  className="waves-effect waves-light nav-link push-btn btn-primary-light"
                  data-toggle="push-menu"
                  role="button"
                >
                  <i data-feather="align-left" />
                </a>
              </li>
                        </ul>
          </div>
          <div className="navbar-custom-menu r-side">
            <ul className="nav navbar-nav">

              {/* Control Sidebar Toggle Button */}

              {/* User Account*/}
              <li className="dropdown user user-menu">
                <a href="#" className="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent py-0 no-shadow"
                  data-bs-toggle="dropdown"
                  title="User"
                >
                  <div className="d-flex pt-5">
                    <div className="text-end me-10">
                      <p className="pt-5 fs-14 mb-0 fw-700 text-primary">{loginData.username}</p>
                      <small className="fs-10 mb-0 text-uppercase text-mute">
                        {usersList?.first_name}
                      </small>
                    </div>
                    {usersList?.profile_pic != null ?
                           <img
                           style={{ height: "50px", width: "50px" }}
                           className="object-cover w-full h-32"
                           src={`${config.imageUrl}${usersList?.profile_pic}`}
                           alt=""
                       /> 
                            :
                            <img
                    style={{ height: "50px", width: "50px" }}
                    className="object-cover w-full h-32"
                    src="images/dummy.jpg"
                    alt=""
                />
                        }
                    
                   
                    {/* <img
                      src="./images/avatar/avatar-1.png"
                      className="avatar rounded-10 bg-primary-light h-40 w-40"
                      alt=""
                    /> */}
                  </div>
                </a>
                <ul className="dropdown-menu animated flipInX">
                  <li className="user-body">
                    <a className="dropdown-item" href={`${config.baseUrl}profile`} >
                      <i className="ti-profile text-muted me-2" data-feather="user" /> Profile
                    </a>
                  </li>
                  <li className="user-body">
                    <a className="dropdown-item" href="javascript:;" onClick={logout}>
                      <i className="ti-lock text-muted me-2" /> Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>

    </>
  )
}
export default Header;