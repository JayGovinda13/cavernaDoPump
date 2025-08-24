import { useState, useEffect } from 'react';

// Objeto com descrições movido para o hook, onde a lógica de dados pertence.
const categoryDescriptions = {
  'Suplementos': 'Potencialize seus resultados com nossa seleção de proteínas, creatinas e aminoácidos da mais alta qualidade.',
  'Acessórios': 'De coqueteleiras a luvas, encontre os acessórios essenciais para um treino mais seguro e eficaz.',
  'Dr. Peanut': 'A energia que você precisa com o sabor que você ama. As melhores pastas de amendoim para sua dieta.',
  'Laricas': 'Opções de snacks saudáveis e proteicos para matar a fome sem sair da dieta.',
  'Destaques': 'Confira uma seleção aleatória dos produtos favoritos da nossa caverna, escolhidos para o seu melhor pump.'
};

export function useProducts(categoryName) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageInfo, setPageInfo] = useState({ title: '', description: '' });

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('/api/getProducts')
      .then(response => {
        if (!response.ok) throw new Error('Falha ao buscar produtos.');
        return response.json();
      })
      .then(allProducts => {
        const currentTitle = categoryName || 'Destaques';
        const currentDescription = categoryDescriptions[currentTitle] || 'Explore nossos produtos.';
        setPageInfo({ title: currentTitle, description: currentDescription });

        let finalProducts = allProducts;
        if (categoryName) {
          finalProducts = allProducts.filter(
            p => p.category.toLowerCase() === categoryName.toLowerCase()
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
      .catch(err => setError('Não foi possível carregar os produtos.'))
      .finally(() => setLoading(false));

  }, [categoryName]);

  return { products, loading, error, pageInfo };
}