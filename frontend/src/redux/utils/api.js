export const fetchAllPhotographersAPI = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/photographes/`
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
