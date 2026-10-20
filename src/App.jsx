import Home from "./pages/Home";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TopSellers from "./components/home/TopSellers";
import AuthorItems from "./components/author/AuthorItems";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <Router
      basename={
        process.env.NODE_ENV === "production" ? "/Kevin-internship" : "/"
      }
    >
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/item-details/:id" element={<ItemDetails />} />
        <Route path="/TopSellers" element={<TopSellers />} />
        <Route path="/AuthorItems/:id" element={<AuthorItems />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
