import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slices/modalSlice";
import "./modal.scss";
import { RegisterForm } from "../registerForm/RegisterForm";
import { LoginForm } from "../loginForm/LoginForm.jsx";
import CloseIcon from "../../assets/icons/close.svg?react";

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const isRegisterFormOpen = useSelector(
    (state) => state.modal.isRegisterFormOpen
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={() => dispatch(closeModal())}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <CloseIcon
          alt="Close icon"
          className="close-button-modal"
          onClick={() => dispatch(closeModal())}
        />
        <div>{isRegisterFormOpen ? <RegisterForm /> : <LoginForm />}</div>
      </div>
    </div>
  );
};

export default Modal;
