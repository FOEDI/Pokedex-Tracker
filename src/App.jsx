import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/components/pages/HomePage";
import MyPokemonPage from "@/components/pages/MyPokemonPage";
import Header from "@/components/Header";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/my-pokemon" element={<MyPokemonPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;