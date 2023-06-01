import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard: React.FC = () => {

  return (
    <LayoutBaseDePagina 
      titulo='Dashboard' 
      barraDeFerramentas={
        <FerramentasDaListagem
          textoDaBusca=''
          mostrarImputBusca
        />
      }
    >
      Testando o Dashboard
    </LayoutBaseDePagina>
  );
};