import React from 'react';

import Auth from '../../utils/auth';

function Header(props) {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className='container'>
      <nav className='navbar navbar-expand-lg'>
        <div className='collapse navbar-collapse' id='navbarText'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <button
                type='button'
                className='btn btn-black text-white'
                onClick={() => {
                  props.setCurrentPage('About');
                }}
              >
                Home
              </button>{' '}
              <span className='sr-only'> </span>
            </li>

            <li className='nav-item active'>
              <button
                type='button'
                className='btn btn-white text-white'
                onClick={() => {
                  props.setCurrentPage('Baked-Goods');
                }}
              >
                Baked Goods
              </button>
              <span className='sr-only'></span>
            </li>
            <li className='nav-item active'>
              <button
                type='button'
                className='btn btn-white text-white'
                onClick={() => {
                  props.setCurrentPage('Newsletter');
                }}
              >
                Newsletter
              </button>
              <span className='sr-only'></span>
            </li>

            {Auth.loggedIn() ? (
              <>
                <li className='nav-item active'>
                  <button
                    type='button'
                    className='btn btn-white text-white'
                    onClick={() => {
                      props.setCurrentPage('Messages');
                    }}
                  >
                    Messages
                  </button>
                  <span className='sr-only'></span>
                </li>
                <li className='nav-item active'>
                  <button
                    type='button'
                    className='btn btn-white text-white'
                    onClick={logout}
                  >
                    Log Out
                  </button>
                  <span className='sr-only'></span>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item active'>
                  <button
                    type='button'
                    className='btn btn-white text-white'
                    onClick={() => {
                      props.setCurrentPage('Contact');
                    }}
                  >
                    Contact
                  </button>
                  <span className='sr-only'></span>
                </li>
                <li className='nav-item active'>
                  <button
                    type='button'
                    className='btn btn-white text-white'
                    onClick={() => {
                      props.setCurrentPage('Login');
                    }}
                  >
                    Login
                  </button>
                  <span className='sr-only'></span>
                </li>
              </>
            )}
          </ul>
          <span className='navbar-text text-white '>
            <div className='logo-image'>
              <img
                src={require(`../../assets/images/logo/logo.JPEG`)}
                alt='logo'
                className='img-fluid'
              ></img>
            </div>
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Header;

