import styled from 'styled-components';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  object-fit: cover;
`;

function Logo() {
  // TODO: Will implement dark mode logo later
  // const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <StyledLogo>
      <Img src="/wild-embrace-logo.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
