import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../redux/thunks/usersThunks";
import { openLoginForm } from "../../redux/slices/modalSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { closeModal } from "../../redux/slices/modalSlice";

// Import icones et styles
import AccountIcon from "../../assets/icons/account_b.svg?react";
import LockIcon from "../../assets/icons/lock.svg?react";
import LockDeuxIcon from "../../assets/icons/lock_b.svg?react";
import MailIcon from "../../assets/icons/mail.svg?react";
import "./registerForm.scss";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.users);
  const [clientError, setClientError] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleOpenLoginForm = () => {
    dispatch(openLoginForm());
  };

  // Fonction pour vérifier le formulaire d'inscription avant envoie côté client
  // afin de ne pas envoyer de requête serveur inutilement
  const validateForm = () => {
    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.confirmPassword ||
      !userData.role
    ) {
      return "Tous les champs sont requis.";
    }
    if (userData.password !== userData.confirmPassword) {
      setClientError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(
        userData.password
      )
    ) {
      return "Le mot de passe doit comporter au moins 8 caractères dont un chiffre, une lettre minuscule, une lettre majuscule et un caractère spécial.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setClientError(validationError);
      return;
    }

    setClientError(null);
    dispatch(registerUserThunk(userData))
      .then(() => {
        // Fermer le modal après la réussite de l'enregistrement
        dispatch(closeModal());
        // Afficher la notification de succès
        toast("Enregistrement effectué avec succès!", {
          className: "success-register-bar",
        });
      })
      .catch((error) => {
        // Gérer l'erreur si nécessaire
        console.error("Erreur lors de l'enregistrement:", error);
      });
  };

  return (
    <section className="section-register-form">
      <div className="form-container">
        <img className="form-img" src="/images/45746278.webp" alt="" />
        <form className="form" onSubmit={handleSubmit}>
          <h2>Bienvenue sur FreeLens !</h2>
          <p>
            Déjà un compte chez nous ? C'est par
            <span onClick={handleOpenLoginForm}> ici.</span>
          </p>
          <div className="input-container">
            <AccountIcon alt="user icon" className="icon-register-form" />
            <input
              className="input-register-form"
              type="text"
              placeholder="Nom d'utilisateur"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
            <MailIcon alt="Mail icon" className="icon-register-form" />
            <input
              className="input-register-form"
              type="email"
              placeholder="Adresse email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <LockIcon alt="password icon" className="icon-register-form" />
            <input
              className="input-register-form"
              type="current-password"
              placeholder="Mot de passe"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <LockDeuxIcon alt="password icon" className="icon-register-form" />
            <input
              className="input-register-form"
              type="new-password"
              placeholder="Confirmer le mot de passe"
              value={userData.confirmPassword}
              onChange={(e) =>
                setUserData({ ...userData, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="select-role">
            <label>Vous êtes ?</label>
            <div>
              <input
                type="checkbox"
                id="client"
                name="role"
                value="client"
                checked={userData.role === "client"}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    role: e.target.checked ? "client" : "",
                  })
                }
              />
              <label htmlFor="client">Client</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="photographer"
                name="role"
                value="photographer"
                checked={userData.role === "photographer"}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    role: e.target.checked ? "photographer" : "",
                  })
                }
              />
              <label htmlFor="photographer">Photographe</label>
            </div>
          </div>
          {clientError && <div className="error">{clientError}</div>}
          {error && <div className="error">{error}</div>}
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </section>
  );
};
