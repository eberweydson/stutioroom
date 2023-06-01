import { useTheme, Box, Avatar, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Icon, useMediaQuery } from '@mui/material'; 
import image from './../../../assets/avatar.jpg';
import { IDrawerOption, useAppDrawerContext, useAppThemeContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

type ListItemLinkProps = {
  to: string,
  icon: string,
  label: string,
  onClick: (() => void) | undefined
};

const ListItemLink: React.FC<ListItemLinkProps> = (props: ListItemLinkProps) => {

  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(props.to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(props.to);
    props.onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{props.icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={props.label} />
    </ListItemButton>
  );
};

type MenuLateralProps = {
  children: React.ReactNode
}

export const AppMenuLateral: React.FC<MenuLateralProps> = ( props: MenuLateralProps ) => {

  const theme = useTheme();
  const smDowm = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useAppDrawerContext();
  const { themeName, toggleTheme } = useAppThemeContext();

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
              {drawerOptions.map((drawerOption: IDrawerOption) => (
                <ListItemLink 
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  label={drawerOption.label} 
                  onClick={smDowm ? toggleDrawerOpen : undefined} 
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>{themeName ==='light' ? 'dark_mode' : 'light_mode'}</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar Tema" />
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