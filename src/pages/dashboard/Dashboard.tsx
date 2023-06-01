import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard: React.FC = () => {

  return (
    <LayoutBaseDePagina titulo='Dashboard' barraDeFerramentas={<>Barra De Ferramentas</>}>
      Testando o Dashboard
    </LayoutBaseDePagina>
  );
};