import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotographerById } from "../../redux/thunks/photographersThunks";
import { useParams } from "react-router-dom";
import "./photographerProfile.scss";

export const PhotographerProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const photographer = useSelector(
    (state) => state.photographers.photographers[id]
  );
  const loading = useSelector((state) => state.photographers.loading);
  const error = useSelector((state) => state.photographers.error);

  useEffect(() => {
    if (!photographer) {
      dispatch(fetchPhotographerById(id));
    }
  }, [dispatch, id, photographer]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!photographer) {
    return <div>Photographe non trouvé</div>;
  }

  const avatarUrl = `${
    import.meta.env.VITE_API_URL
  }/${photographer.avatarPath.replace(/\\/g, "/")}`;

  return (
    <section className="photographer-profile">
      <div className="photographer-profile-container">
        <div className="photographer-profile-avatar">
          <img src={avatarUrl} alt={`Profil de ${photographer.name}`} />
          <span id="likes" className="material-symbols-outlined">
            favorite
          </span>
        </div>
        <div className="photographer-profile-description">
          <h1 className="photographer-name">{photographer.name}</h1>
          <p className="localisation">
            {photographer.city}, {photographer.country}
          </p>
          <p className="price">{photographer.price}€/jour</p>
          <p className="apropos">{photographer.apropos}</p>
          <button className="contact-button">Contactez-moi</button>
        </div>
      </div>
    </section>
  );
};
