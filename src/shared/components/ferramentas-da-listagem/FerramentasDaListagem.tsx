import { PropsWithChildren } from 'react';
import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarImputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

/* eslint-disable react/prop-types */
export const FerramentasDaListagem: React.FC<PropsWithChildren<IFerramentasDaListagemProps>> = ({ 
  textoDaBusca = '', 
  mostrarImputBusca = false, 
  aoMudarTextoDeBusca, 
  textoBotaoNovo = 'Novo', 
  mostrarBotaoNovo = true, 
  aoClicarEmNovo 
}) => {
/* eslint-enable react/prop-types */

  const theme = useTheme();

  return (
    <Box 
      height={theme.spacing(5)} 
      marginX={1} 
      padding={1} 
      paddingX={2} 
      display="flex" 
      alignItems="center" 
      gap={1} 
      component={Paper}
    >
      {mostrarImputBusca && (
        <TextField 
          size='small'
          value={textoDaBusca}
          placeholder='Pesquisar...'
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}
      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}
          >{textoBotaoNovo}</Button>
        )}
      </Box>
    </Box>
  );
};