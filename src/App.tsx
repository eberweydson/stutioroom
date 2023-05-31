import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes';
import { AppDrawerProvider, AppThemeProvider } from './shared/contexts';
import { AppMenuLateral } from './shared/components';

export const App = () => {

  return (
    <AppThemeProvider>
      <AppDrawerProvider>
        <BrowserRouter>
          <AppMenuLateral>
            <AppRoutes />
          </AppMenuLateral>
        </BrowserRouter>
      </AppDrawerProvider>
    </AppThemeProvider>
  );

};
