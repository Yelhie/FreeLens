import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMediasByIdPhotographerThunk } from "../../redux/thunks/mediasThunks";
import { MediaCard } from "../mediaCard/MediaCard";
import { Loader } from "../loader/Loader";
import "./mediaCardContainer.scss";

export const MediaCardContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const medias = useSelector((state) => state.medias.medias);
  const loading = useSelector((state) => state.medias.loading);
  const error = useSelector((state) => state.medias.error);
  const [sortCriteria, setSortCriteria] = useState("date");

  useEffect(() => {
    if (id) {
      dispatch(fetchMediasByIdPhotographerThunk(id));
    }
  }, [dispatch, id]);

  const getSortedMedias = () => {
    return [...medias].sort((a, b) => {
      switch (sortCriteria) {
        case "likes":
          return b.likes - a.likes;
        case "name":
          return a.title.localeCompare(b.title);
        case "date":
          return new Date(a.date) - new Date(b.date);
        default:
          return 0;
      }
    });
  };

  if (loading) return <Loader />;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <section className="section-photographer-gallery">
      <div className="sort-selector">
        <label htmlFor="sortCriteria">Trier par :</label>
        <select
          id="sortCriteria"
          value={sortCriteria}
          onChange={(event) => setSortCriteria(event.target.value)}
          aria-label="Critères de tri"
        >
          <option value="date">Date</option>
          <option value="likes">Popularité</option>
          <option value="name">Nom</option>
        </select>
      </div>
      <div className="gallery">
        {getSortedMedias().map((media) => (
          <MediaCard key={media._id} media={media} />
        ))}
      </div>
    </section>
  );
};
