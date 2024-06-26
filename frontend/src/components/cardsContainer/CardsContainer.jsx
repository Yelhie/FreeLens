import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchValidPhotographersThunk } from "../../redux/thunks/photographersThunks";
import { PhotographerCard } from "../photographerCard/PhotographerCard";
import { Loader } from "../loader/Loader";
import "./cardsContainer.scss";

export const CardsContainer = () => {
  const dispatch = useDispatch();
  const { photographers, loading, error } = useSelector(
    (state) => state.photographers
  );

  useEffect(() => {
    dispatch(fetchValidPhotographersThunk());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <section className="photographer-section">
      <div className="photographer-section-header">
        <h2>Nos photographes</h2>
        <p>Vos professionnels partout dans le monde</p>
      </div>

      <div className="photographer-cards-container">
        {photographers.map((photographer) => (
          <PhotographerCard
            key={photographer._id}
            photographer={photographer}
          />
        ))}
      </div>
    </section>
  );
};
