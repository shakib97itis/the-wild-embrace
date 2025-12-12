import {HiOutlineMoon, HiOutlineSun} from 'react-icons/hi2';
import ButtonIcon from './ButtonIcon';
import useDarkMode from '../context/useDarkMode';

const DarkModeToggle = () => {
  const {isDarkMode, toggleDarkMode} = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode} aria-label="Toggle dark mode">
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
