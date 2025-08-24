import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout/Layout'; 
import LandingPage from './pages/LadingPage'
import ProductGrid from './Components/ProductGrid/ProductGrid';

function App() {
  return (
    <Routes>
      {/* Rota da Homepage usa o seu componente LandingPage */}
      <Route path="/" element={<LandingPage />} />

      {/* Rotas que usam o Layout principal */}
      <Route element={<Layout />}>
        {/* As rotas da loja e categorias usam o seu componente ProductGrid */}
        <Route path="/loja" element={<ProductGrid />} />
        <Route path="/categoria/:categoryName" element={<ProductGrid />} />
      </Route>
    </Routes>
  );
}

export default App;