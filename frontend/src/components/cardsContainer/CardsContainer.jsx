import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotographers } from "../../redux/thunks/photographersThunks";
import { PhotographerCard } from "../photographerCard/PhotographerCard";
import { Link } from "react-router-dom";
import "./cardsContainer.scss";

export const CardsContainer = () => {
  const dispatch = useDispatch();
  const { photographers, loading, error } = useSelector(
    (state) => state.photographers
  );

  useEffect(() => {
    dispatch(fetchPhotographers());
  }, [dispatch]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
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
