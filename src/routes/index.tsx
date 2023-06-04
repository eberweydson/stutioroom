import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListagemDeCidades, ListagemDePessoas } from '../pages';

export const AppRoutes = () => { 

  const { setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        label: 'Pagina Inicial',
        path: '/pagina-inicial'
      },{
        icon: 'people',
        label: 'Pessoas',
        path: '/pessoas'
      },{
        icon: 'location_city',
        label: 'Cidades',
        path: '/cidades'
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/pessoas" element={<ListagemDePessoas />} />
      {/*<Route path="/pessoas/detalhes/:id" element={<DetalheDePessoas />} />*/}
      <Route path="/cidades" element={<ListagemDeCidades />} />
      {/*<Route path="/cidades/detalhes/:id" element={<DetalheDeCidades />} />*/}
      <Route path="*" element={<Navigate to ="/pagina-inicial" />} />
    </Routes>
  );
  
};
