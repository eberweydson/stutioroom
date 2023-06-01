import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAppDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
  titulo: string,
  children: React.ReactNode
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = (props: ILayoutBaseDePaginaProps) => {

  const theme = useTheme();
  //const smDowm = useMediaQuery(theme.breakpoints.down('sm'));
  const smDowm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { toggleDrawerOpen } = useAppDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box padding={1} display="flex" alignItems="center" height={theme.spacing(12)} gap={1}>
        {smDowm && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography variant='h5'>
          {props.titulo}
        </Typography>
      </Box>
      <Box>
        Barra de Ferramentas
      </Box>
      <Box>
        {props.children}
      </Box>
    </Box>
  );
};