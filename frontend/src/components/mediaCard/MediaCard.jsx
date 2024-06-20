import "./mediaCard.scss";

export const MediaCard = ({ media }) => {
  const fileUrl = `${import.meta.env.VITE_API_URL}/${media.filePath.replace(
    /\\/g,
    "/"
  )}`;

  return (
    <article className="media-card">
      <img src={fileUrl} className="media-img" alt={`Photo de ${media.tite}`} />
      <div className="media-infos">
        <p className="title">{media.title}</p>
        <p className="likes-container">
          {media.likes}
          <span id="likes" className="material-symbols-outlined">
            favorite
          </span>
        </p>
      </div>
    </article>
  );
};
