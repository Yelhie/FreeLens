// Fonctions d'appel à l'API pour récupérer les profils valides (Compte où tous les champs ont été renseignés) des photographes.
export const fetchAllValidPhotographersAPI = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/photographes/valid`
    );
    if (!response.ok) {
      throw new Error("Erreur réseau");
    }
    return response.json();
  } catch (error) {
    throw new Error("Erreur lors de la récupération des photographes");
  }
};

// Fonctions d'appel à l'API pour récupérer les données des photographes en fonction de l'ID du photographe.
export const fetchPhotographerByIdAPI = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/photographes/${id}`
    );
    if (!response.ok) {
      throw new Error("Erreur réseau");
    }
    return response.json();
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération du photographe avec ID ${id}`
    );
  }
};

// Fonctions d'appel à l'API pour récupérer les données des médias en fonction de l'ID du photographe.
export const fetchMediasByIdPhotographerAPI = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/medias/${id}`
    );
    if (!response.ok) {
      throw new Error("Erreur réseau");
    }
    return response.json();
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération des médias du photographe ${id}`
    );
  }
};

// Fonction d'appel à l'API pour enregistrer un nouvel utilisateur.
export const fetchRegisterUserAPI = async (userData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    if (!response.ok) {
      const errorData = await response.json(); // Extraire les détails de l'erreur
      // console.error("Erreur du backend:", errorData.message);
      throw new Error(errorData.message || "Erreur réseau");
    }
    return await response.json();
  } catch (error) {
    // console.error("Erreur capturée:", error.message);
    throw new Error(error.message);
    // error.message || "Erreur lors de l'enregistrement de l'utilisateur"
  }
};
