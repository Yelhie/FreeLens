import { useEffect, useState } from "react";
import { PhotographerCard } from "../photographerCard/PhotographerCard";
import { Link } from "react-router-dom";
import "./cardsContainer.scss";

export const CardsContainer = () => {
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/photographes/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPhotographers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="photographer-section">
      <div className="photographer-section-header">
        <h2>Nos photographes</h2>
        <p>Vos professionnels partout dans le monde</p>
      </div>

      <div className="photographer-cards-container">
        {photographers.map((photographer) => (
          <Link key={photographer._id} to={`/photographer/${photographer._id}`}>
            <PhotographerCard photographer={photographer} />
          </Link>
        ))}
      </div>
    </section>
  );
};
