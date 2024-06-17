import { Link } from "react-router-dom";
import "./banner.scss";

export const Banner = () => {
  return (
    <div className="banner-container">
      <img className="banner-img" src="images/banner.webp" alt="" />
      <div className="banner-text">
        <h1>Travaillez avec des experts !</h1>
        <p>
          Explorez notre plateforme et trouvez le photographe freelance parfait
          pour votre projet. Des portraits aux paysages époustouflants, nos
          artistes capturent des moments uniques avec une précision et une
          créativité incomparables.
        </p>
        <Link to="#">
          <button className="link-btn">En savoir plus</button>
        </Link>
      </div>
    </div>
  );
};
