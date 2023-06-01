import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAppDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
  titulo: string,
  barraDeFerramentas?: React.ReactNode,
  children?: React.ReactNode,
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = (props: ILayoutBaseDePaginaProps) => {

  const theme = useTheme();
  //const smDowm = useMediaQuery(theme.breakpoints.down('sm'));
  const smDowm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const { toggleDrawerOpen } = useAppDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box padding={1} display="flex" alignItems="center" gap={1} height={theme.spacing(smDowm ? 6 : lgDown ? 8 : 12)}>
        {smDowm && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography 
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          variant={smDowm ? 'h5' : lgDown ? 'h4' : 'h3'}
        >
          {props.titulo}
        </Typography>
      </Box>
      {props.barraDeFerramentas && (
        <Box>
          {props.barraDeFerramentas}
        </Box>
      )}
      <Box flex={1} overflow="auto">
        {props.children}
      </Box>
    </Box>
  );
};