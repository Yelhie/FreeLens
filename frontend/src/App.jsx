import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
// Pages
import { HomePage } from "./pages/homePage/HomePage";
import { ErrorPage } from "./pages/errorPage/ErrorPage";
import { PhotographerPage } from "./pages/photographerPage/PhotographerPage";
// Styles
import "./style.scss";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/photographer/:id" element={<PhotographerPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={6000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        transition:Slide
      />
    </>
  );
}

export default App;
