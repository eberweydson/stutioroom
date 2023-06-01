import { Box, Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDrawerContext, useAppThemeContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard } from '../pages';

export const AppRoutes = () => { 

  const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen, setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        label: 'Pagina Inicial',
        path: '/pagina-inicial'
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      {/*
        <Box width="100%">
          <Button variant="contained" color="primary" onClick={toggleTheme}>Toggle Theme</Button>
          <Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Toggle Open</Button>
        </Box>
      */}
      <Route path="*" element={<Navigate to ="/pagina-inicial" />} />
    </Routes>
  );
  
};
