import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header'
import LandingPage from './pages/LadingPage';
import ProductGrid from './Components/ProductGrid/ProductGrid'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header /> 
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Rota para todos os produtos */}
          <Route path="/loja" element={<ProductGrid />} />

          {/* Nova Rota Dinâmica para Categorias */}
          <Route path="/categoria/:categoryName" element={<ProductGrid />} />

        </Routes>
      </main>
    </>
  )
}

export default App
