import styled from 'styled-components';

export const TabBtnContainer = styled.span`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 1px 2px 0px;
  transition: all 230ms ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;

  &:first-child {
    cursor: pointer;
  }

  & > svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    transform: scale(1.03);
    opacity: 1;
    & > svg {
      color: ${({ theme }) => theme.colors.blue['6']};
    }
  }
`;
