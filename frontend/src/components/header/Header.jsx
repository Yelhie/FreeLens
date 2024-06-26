import { Link } from "react-router-dom";
import "./header.scss";
import SignupIcon from "../../assets/icons/signup.svg?react";
import LoginIcon from "../../assets/icons/login.svg?react";
// Modal
import Modal from "../modal/Modal";
import {
  openModal,
  openRegisterForm,
  openLoginForm,
} from "../../redux/slices/modalSlice";
import { useDispatch } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();

  const handleSignupClick = () => {
    dispatch(openModal());
    dispatch(openRegisterForm()); // Ouvre le formulaire d'inscription
  };

  const handleLoginClick = () => {
    dispatch(openModal());
    dispatch(openLoginForm()); // Ouvre le formulaire de connexion
  };
  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src="/icones/logo.webp" className="logo" alt="FreeLens logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="#">Nos Photographes</Link>
          </li>
          <li>
            <Link to="#">Nos Agences</Link>
          </li>
          <li>
            <Link to="#">Nos Services</Link>
          </li>
          <li className="account-icon-container" onClick={handleSignupClick}>
            <SignupIcon alt="Sign up icon" className="signup-icon" />
            <span>Sign Up</span>
          </li>
          <li className="account-icon-container" onClick={handleLoginClick}>
            <LoginIcon alt="Login icon" className="login-icon" />
            <span>Login</span>
          </li>
          <Modal />
        </ul>
      </nav>
    </header>
  );
};
