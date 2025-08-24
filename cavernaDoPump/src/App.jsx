import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import LandingPage from './pages/LadingPage';
import ProductGrid from './Components/ProductGrid/ProductGrid';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<Layout />}>
        <Route path="/loja" element={<ProductGrid />} />
        <Route path="/categoria/:categoryName" element={<ProductGrid />} />
      </Route>
    </Routes>
  );
}

export default App;