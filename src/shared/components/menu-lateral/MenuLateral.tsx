import { useTheme, Box, Avatar, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Icon, useMediaQuery } from '@mui/material'; 
import image from './../../../assets/avatar.jpg';
import { useAppDrawerContext } from '../../contexts';

type MenuLateralProps = {
  children: React.ReactNode
}

export const AppMenuLateral: React.FC<MenuLateralProps> = ( props: MenuLateralProps ) => {

  const theme = useTheme();
  const smDowm = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { isDrawerOpen, toggleDrawerOpen } = useAppDrawerContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDowm ? 'temporary' : 'permanent' } onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column" >
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar
              sx={{ width: theme.spacing(12), height: theme.spacing(12) }}
              src={image}
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Página Inicial" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDowm ? 0 : theme.spacing(28)}>
        {props.children}
      </Box>
    </>
  );

};