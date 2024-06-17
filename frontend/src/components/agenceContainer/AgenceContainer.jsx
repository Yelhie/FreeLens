import "./agenceContainer.scss";

export const AgenceContainer = () => {
  return (
    <section className="agences-infos-section">
      <h2>Nos agences</h2>
      <p>Vos contacts au plus proche de chez-vous</p>
      <div className="agences-infos-container">
        <div className="agences-infos-photo">
          <img
            className="agences-photo"
            src="images/locaux.webp"
            alt="Photo de nos locaux"
          />
        </div>
        <div className="agences-infos-adresses">
          <ul>
            <li>
              <span className="material-symbols-outlined">location_on</span>
              <b>Sidney :</b> 45 chemin Pirrama, Pyrmont Nouvelle-Galles du Sud
              2022
            </li>
            <li>
              <span className="material-symbols-outlined">location_on</span>
              <b>Melbourne :</b> 163, rue Collins, Melbourne VIC 3000
            </li>
            <li>
              <span className="material-symbols-outlined">location_on</span>
              <b>Los Angeles :</b> 340 Main St, Venise CA 902291, États-Unis
            </li>
            <li>
              <span className="material-symbols-outlined">location_on</span>
              <b>Londres :</b> 37 Main Street Londres EC34 5 To
            </li>
            <li>
              <span className="material-symbols-outlined">Location_on</span>
              <b>Tokyo :</b> 456 Cherry Blossom Street, Japan 100-0001
            </li>
            <li>
              <span className="material-symbols-outlined"> location_on</span>
              <b>Paris :</b> 123 Avenue des Arts 75001 Paris, France
            </li>
          </ul>
          <a href="#">
            <button className="link_btn">Plus d&apos;adresses</button>
          </a>
        </div>
      </div>
    </section>
  );
};
