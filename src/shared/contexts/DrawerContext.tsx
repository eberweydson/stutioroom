import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
  return useContext(DrawerContext);
};

type DrawerProps = {
  children: React.ReactNode
}

export const AppDrawerProvider: React.FC<DrawerProps> = (props: DrawerProps) => {

  const [ isDrawerOpen, setDrawerOpen ] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {props.children}
    </DrawerContext.Provider>
  );

};