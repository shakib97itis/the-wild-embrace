import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  color: var(--color-grey-600);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }
`;

export default Input;
