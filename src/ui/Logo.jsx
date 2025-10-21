import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  object-fit: cover;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/wild-embrace-logo.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
