import React from 'react';
import ButtonIcon from '../../ui/ButtonIcon';
import {HiLogout} from 'react-icons/hi';
import SpinnerMini from '../../ui/SpinnerMini';
import {useLogout} from './useLogout';

const Logout = () => {
  const {logout, isLoggingOut} = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <ButtonIcon onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? <SpinnerMini /> : <HiLogout size={24} />}
    </ButtonIcon>
  );
};

export default Logout;
