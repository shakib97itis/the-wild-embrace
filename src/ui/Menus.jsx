import {createContext, useContext, useState} from 'react';
import {createPortal} from 'react-dom';
import {HiEllipsisHorizontal} from 'react-icons/hi2';
import styled from 'styled-components';
import useOutsideClick from '../hooks/useOutsideClick';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

const Menus = ({children}) => {
  const [openId, setOpenId] = useState(null);
  const [position, setPosition] = useState({x: 0, y: 0});

  const open = (id) => setOpenId(id);
  const close = () => setOpenId(null);

  return (
    <MenusContext.Provider value={{openId, open, close, position, setPosition}}>
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({id}) => {
  const {open, close, openId, setPosition} = useContext(MenusContext);

  const handleToggle = (e) => {
    openId === id ? close() : open(id);
    const rect = e.target.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 10,
    });
  };

  return (
    <StyledToggle onClick={handleToggle}>
      <HiEllipsisHorizontal />
    </StyledToggle>
  );
};

const List = ({children, id}) => {
  const {openId, close, position} = useContext(MenusContext);
  const ref = useOutsideClick(close);
  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button = ({children, icon, onClick}) => {
  const {close} = useContext(MenusContext);
  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <StyledButton onClick={handleClick}>
      {icon}
      <span>{children}</span>
    </StyledButton>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
