import {createContext} from 'react';
import {useLocalStorageState} from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({children}) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'darkMode');

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
      {children}
    </DarkModeContext.Provider>
  );
}

export {DarkModeContext};
export default DarkModeProvider;
