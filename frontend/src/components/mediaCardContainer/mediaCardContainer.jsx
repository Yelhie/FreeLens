import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMediasByIdPhotographerThunk } from "../../redux/thunks/mediasThunks";
import { MediaCard } from "../mediaCard/MediaCard";
import "./mediaCardContainer.scss";

export const MediaCardContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const medias = useSelector((state) => state.medias.medias);

  // console.log(medias);

  useEffect(() => {
    if (id) {
      dispatch(fetchMediasByIdPhotographerThunk(id));
    }
  }, [dispatch, id]);

  return (
    <section className="section-photographer-gallery">
      <div className="gallery">
        {medias.map((media) => (
          <MediaCard key={media._id} media={media} />
        ))}
      </div>
    </section>
  );
};
