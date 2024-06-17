import { Link } from "react-router-dom";
import "./footer.scss";

export const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-text">
          <b> Au service de vos besoins, notre talent.</b>
          <p>
            FreeLens est une platforme qui s&apos;adresse à tous ceux qui
            cherche des photographes professionnels.
          </p>
          <div className="footer-social-link">
            <Link to="#">
              <img src="icones/facebook.webp" alt="logo facebook" />
            </Link>
            <Link to="#">
              <img src="icones/blueky.webp" alt="logo bluesky" />
            </Link>
            <Link to="#">
              <img src="icones/linkedin.webp" alt="logo linkedin" />
            </Link>
            <Link to="#">
              <img src="icones/x.webp" alt="logo X" />
            </Link>
          </div>
          <p className="copyright">
            2024 © <Link to="https://github.com/Yelhie">Yelhie</Link>. Tous
            droits réservés.
          </p>
        </div>
        <div className="footer-photographes">
          <b>Photographes</b>
          <ul>
            <li>
              <Link to="#">Déposer votre CV</Link>
            </li>
            <li>
              <Link to="#">Vos missions</Link>
            </li>
            <li>
              <Link to="#">Vos avantages</Link>
            </li>
            <li>
              <Link to="#">FreeLens Business</Link>
            </li>
          </ul>
        </div>
        <div className="footer-apropos">
          <b>A propos </b>
          <ul>
            <li>
              <Link to="#">Qui somme nous ?</Link>
            </li>
            <li>
              <Link to="#">Aide et support</Link>
            </li>
            <li>
              <Link to="#">CGU et CGV</Link>
            </li>
            <li>
              <Link to="#">Guides</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
