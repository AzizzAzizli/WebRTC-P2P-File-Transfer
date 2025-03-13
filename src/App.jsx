import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import DownloadPage from "./pages/DownloadPage/DownloadPage";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/download/:id" element={<DownloadPage />} />
      </Routes>
    </>
  );
}

export default App;
