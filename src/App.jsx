import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HomePage from "@/components/pages/HomePage";
import MyPokemonPage from "@/components/pages/MyPokemonPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-pokemon" element={<MyPokemonPage />} />
          <Route path="*" element={
            <div className="container mx-auto p-4 text-center">
              <h1 className="text-2xl font-bold mb-4">Page non trouvée</h1>
              <Link to="/" className="text-primary hover:underline">
                Retourner à l'accueil
              </Link>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;