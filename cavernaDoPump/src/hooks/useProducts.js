import { useState, useEffect } from 'react';

export function useProducts(categoryName) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // 1. A URL agora aponta para a nossa API segura
    const API_URL = '/api/getProducts';

    // 2. Usamos fetch para buscar os dados
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha na resposta da rede');
        }
        return response.json();
      })
      .then(allProducts => {
        let finalProducts = allProducts;

        // 3. A lógica de filtro e embaralhamento agora vive aqui
        if (categoryName) {
          finalProducts = allProducts.filter(
            product => product.category.toLowerCase() === categoryName.toLowerCase()
          );
        } else {
          const shuffled = [...allProducts];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          finalProducts = shuffled.slice(0, 10);
        }
        
        setProducts(finalProducts);
      })
      .catch(err => {
        console.error("Erro ao buscar produtos:", err);
        setError("Não foi possível carregar os produtos. Tente novamente mais tarde.");
      })
      .finally(() => {
        setLoading(false);
      });

  }, [categoryName]); // O efeito roda sempre que a categoria muda

  return { products, loading, error };
}