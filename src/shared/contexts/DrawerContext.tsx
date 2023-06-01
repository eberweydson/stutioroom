import { createContext, useCallback, useContext, useState } from 'react';

export interface IDrawerOption {
  icon: string;
  path: string;
  label: string;
}

interface IDrawerContextData {
  isDrawerOpen: boolean;
  drawerOptions: IDrawerOption[];
  toggleDrawerOpen: () => void;
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
  return useContext(DrawerContext);
};

interface IDrawerProps {
  children: React.ReactNode
}

export const AppDrawerProvider: React.FC<IDrawerProps> = (props: IDrawerProps) => {

  const [ isDrawerOpen, setDrawerOpen ] = useState(false);
  const [ drawerOptions, setDrawerOptions ] = useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
      {props.children}
    </DrawerContext.Provider>
  );

};