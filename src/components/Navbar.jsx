import React, {
  useState,
  useContext,
  useEffect
} from 'react';

import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom';

import {
  Menu,
  X,
  Compass,
  ShieldAlert,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  User,
  ShoppingBag,
  MessageSquare
} from 'lucide-react';

import { AuthContext } from '../context/AuthContext';

export default function Navbar() {

  const [isOpen, setIsOpen] =
    useState(false);

  const [showLoginMenu, setShowLoginMenu] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const {
    user,
    logout
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 20);

    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );

  }, []);

  useEffect(() => {

    setIsOpen(false);

    setShowLoginMenu(false);

  }, [location]);

  return (

    <nav
      className={`navbar ${
        scrolled
          ? 'navbar-scrolled'
          : ''
      }`}
    >

      {/* LOGO */}

      <Link
        to="/"
        className="logo"
      >

        Vivo

        <span className="logo-dot"></span>

      </Link>

      {/* DESKTOP MENU */}

      <div className="desktop-menu">

        {/* EXPLORE */}

        <Link
          to="/marketplace"
          className="nav-link"
        >

          <Compass size={16} />

          Explore

        </Link>

        {/* BUYER */}

        {user?.role === 'buyer' && (

          <>

            <Link
              to="/buyer/dashboard"
              className="nav-link"
            >

              <ShoppingBag size={16} />

              Orders

            </Link>

            <Link
              to="/buyer/dashboard/messages"
              className="nav-link"
            >

              <MessageSquare size={16} />

              Messages

            </Link>

          </>
        )}

        {/* SELLER */}

        {user?.role === 'seller' && (

          <Link
            to="/seller/dashboard"
            className="nav-link seller-link"
          >

            <LayoutDashboard size={16} />

            Seller Dashboard

          </Link>
        )}

        {/* ADMIN */}

        {user?.role === 'admin' && (

          <Link
            to="/admin/dashboard"
            className="nav-link admin-link"
          >

            <ShieldAlert size={16} />

            Admin Dashboard

          </Link>
        )}

        {/* USER */}

        {user ? (

          <div className="user-box">

            <Link to='/' style={{textDecoration:'none'}}>
            <span className="user-email">

              {user.name || user.email}

            </span>
            </Link>

            <button
              onClick={() => {

                logout();

                navigate('/');

              }}
              className="logout-btn"
            >

              <LogOut size={15} />

              Logout

            </button>

          </div>

        ) : (

          <>

            {/* LOGIN */}

            <div className="login-wrapper">

              <button
                className="login-btn"
                onClick={() =>
                  setShowLoginMenu(
                    !showLoginMenu
                  )
                }
              >

                <User size={16} />

                Login

                <ChevronDown size={15} />

              </button>

              {showLoginMenu && (

                <div className="login-dropdown">

                  <Link
                    to="/login/buyer"
                    className="dropdown-item"
                  >

                    Buyer Login

                  </Link>

                  <Link
                    to="/login/seller"
                    className="dropdown-item"
                  >

                    Seller Login

                  </Link>

                  <Link
                    to="/admin/login"
                    className="dropdown-item"
                  >

                    Admin Login

                  </Link>

                </div>
              )}

            </div>

            {/* GET STARTED */}

            <Link
              to="/get-started"
              className="premium-btn"
            >

              Get Started

            </Link>

          </>
        )}

      </div>

      {/* MOBILE BUTTON */}

      <button
        className="mobile-btn"
        onClick={() =>
          setIsOpen(!isOpen)
        }
      >

        {isOpen
          ? <X size={24} />
          : <Menu size={24} />}

      </button>

      {/* MOBILE MENU */}

      {isOpen && (

        <div className="mobile-menu">

          {/* EXPLORE */}

          <Link
            to="/marketplace"
            className="mobile-link"
          >

            <Compass size={18} />

            Explore

          </Link>

          {/* BUYER */}

          {user?.role === 'buyer' && (

            <>

              <Link
                to="/buyer/dashboard"
                className="mobile-link"
              >

                <ShoppingBag size={18} />

                Orders

              </Link>

              <Link
                to="/buyer/dashboard/messages"
                className="mobile-link"
              >

                <MessageSquare size={18} />

                Messages

              </Link>

            </>
          )}

          {/* SELLER */}

          {user?.role === 'seller' && (

            <Link
              to="/seller/dashboard"
              className="mobile-link seller-link"
            >

              <LayoutDashboard size={18} />

              Seller Dashboard

            </Link>
          )}

          {/* ADMIN */}

          {user?.role === 'admin' && (

            <Link
              to="/admin/dashboard"
              className="mobile-link admin-link"
            >

              <ShieldAlert size={18} />

              Admin Dashboard

            </Link>
          )}

          {/* LOGIN LINKS */}

          {!user && (

            <>

              <Link
                to="/login/buyer"
                className="mobile-link"
              >

                Buyer Login

              </Link>

              <Link
                to="/login/seller"
                className="mobile-link"
              >

                Seller Login

              </Link>

              <Link
                to="/admin/login"
                className="mobile-link"
              >

                Admin Login

              </Link>

              <Link
                to="/get-started"
                className="premium-btn mobile-premium-btn"
              >

                Get Started

              </Link>

            </>
          )}

          {/* LOGOUT */}

          {user && (

            <button
              onClick={() => {

                logout();

                navigate('/');

              }}
              className="logout-btn mobile-logout"
            >

              <LogOut size={18} />

              Logout

            </button>
          )}

        </div>
      )}

    </nav>
  );
}