import {createContext, useEffect} from 'react';
import {useLocalStorageState} from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({children}) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'darkMode');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

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
