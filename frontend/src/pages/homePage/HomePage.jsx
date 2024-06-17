import { AgenceContainer } from "../../components/agenceContainer/AgenceContainer";
import { Banner } from "../../components/banner/Banner";
import { CardsContainer } from "../../components/cardsContainer/CardsContainer";

export const HomePage = () => {
  return (
    <>
      <Banner />
      <CardsContainer />
      <AgenceContainer />
    </>
  );
};
