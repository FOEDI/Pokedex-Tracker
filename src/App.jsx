import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HomePage from "@/components/pages/HomePage";
import MyPokemonPage from "@/components/pages/MyPokemonPage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-pokemon" element={<MyPokemonPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;