import { Link } from "react-router-dom";
import "./header.scss";

export const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src="icones/logo.webp" className="logo" alt="FreeLens logo" />
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
        </ul>
      </nav>
    </header>
  );
};
