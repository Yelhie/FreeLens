export const MediaCard = ({ photographer }) => {
  const avatarUrl = `${
    import.meta.env.VITE_API_URL
  }/${photographer.avatarPath.replace(/\\/g, "/")}`;

  return (
    <article className="card">
      <div className="img-container">
        <img
          src={avatarUrl}
          className="photographer-picture"
          alt={`Photo de profile de ${photographer.name}`}
        />
      </div>
      <div className="text-container">
        <h2>{photographer.name}</h2>
        <p className="localisation">
          {photographer.city}, {photographer.country}
        </p>
        <p className="price">{photographer.price}€/jour</p>
      </div>
    </article>
  );
};
