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
