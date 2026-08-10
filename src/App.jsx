import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import About from "./pages/About";

function App() {
  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        dark:bg-slate-950
        text-gray-800
        dark:text-white
        transition-colors
        duration-500
      "
    >
      {/* نوار ناوبری */}

      <Navbar />

      {/* صفحات */}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/favorites" element={<Favorites />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
