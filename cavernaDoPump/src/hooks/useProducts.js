import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    async function getProducts() {
      // Inicia um grupo de logs para esta execução do hook
      console.group(`[useProducts] Buscando produtos para a categoria: ${categoryName || 'Destaques'}`);
      
      setLoading(true);
      setError(null);
      console.info('Estado inicializado: loading=true, error=null');

      try {
        let query = supabase.from('cavernaDoPump').select('*');
        
        if (categoryName) {
          query = query.eq('category', categoryName);
          console.log(`Filtrando pela categoria: ${categoryName}`);
        } else {
          console.log('Nenhuma categoria definida, buscando todos os produtos para embaralhar.');
        }

        const { data, error: queryError } = await query;

        if (queryError) {
          throw queryError;
        }

        console.log(`Dados brutos recebidos do Supabase:`, data);
        
        // Filtro para remover linhas vazias ou inválidas
        const validProducts = data.filter(p => p && p.name && p.name.trim() !== '');
        if(validProducts.length < data.length) {
          console.warn(`Foram removidos ${data.length - validProducts.length} produtos inválidos (linhas vazias ou sem nome).`);
        }

        let finalProducts = validProducts;
        const currentTitle = categoryName || 'Destaques';

        if (!categoryName) {
          const shuffled = [...validProducts];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          finalProducts = shuffled.slice(0, 10);
          console.info(`Modo 'Destaques': ${validProducts.length} produtos embaralhados, ${finalProducts.length} selecionados.`);
        }

        console.log('Definindo estado final dos produtos:', finalProducts);
        setProducts(finalProducts);
        setPageInfo({
          title: currentTitle,
          description: categoryDescriptions[currentTitle] || 'Explore nossos produtos.'
        });

      } catch (err) {
        // Log de erro aprimorado
        console.error("ERRO DETALHADO ao buscar produtos do Supabase:", err);
        setError("Não foi possível carregar os produtos. Verifique o console para mais detalhes.");
      } finally {
        setLoading(false);
        console.info('Busca finalizada: loading=false');
        console.groupEnd(); // Fecha o grupo de logs
      }
    }

    getProducts();
  }, [categoryName]);

  return { products, loading, error, pageInfo };
}