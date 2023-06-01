import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard: React.FC = () => {

  return (
    <LayoutBaseDePagina 
      titulo='Dashboard' 
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostrarBotaoSalvarEFechar
          mostrarBotaoSalvarEFecharCarregando
        />
      }
    >
      Testando o Dashboard
    </LayoutBaseDePagina>
  );
};