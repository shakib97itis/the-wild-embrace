import styled from 'styled-components';
import useDarkMode from './../context/useDarkMode';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  object-fit: cover;
`;

function Logo() {
  const {isDarkMode} = useDarkMode();

  return (
    <StyledLogo>
      <Img
        src={
          isDarkMode
            ? '/the_wild_embrace_logo_gold.png'
            : '/the_wild_embrace_logo_light.png'
        }
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;
