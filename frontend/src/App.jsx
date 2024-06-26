import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import "./style.scss";
// Pages
import { HomePage } from "./pages/homePage/HomePage";
import { ErrorPage } from "./pages/errorPage/ErrorPage";
import { PhotographerPage } from "./pages/photographerPage/PhotographerPage";
import { RegisterPage } from "./pages/registerPage/RegisterPage";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/photographer/:id" element={<PhotographerPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
