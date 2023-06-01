import { BarraDeFerramentas } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard: React.FC = () => {

  return (
    <LayoutBaseDePagina 
      titulo='Dashboard' 
      barraDeFerramentas={
        <BarraDeFerramentas
          textoDaBusca=''
          mostrarImputBusca
        />
      }
    >
      Testando o Dashboard
    </LayoutBaseDePagina>
  );
};