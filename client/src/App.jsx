import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import DownloadPage from "./pages/DownloadPage/DownloadPage";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <ToastContainer position="top-right" theme="dark" />
      <Header />
      <main className="flex flex-1 items-stretch">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download/:roomId" element={<DownloadPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
