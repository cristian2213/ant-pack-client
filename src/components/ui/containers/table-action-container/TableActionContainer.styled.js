import styled from 'styled-components';

export const TableActionContainer = styled.div`
  cursor: pointer;
  font-size: 2rem;
  color: ${(props) => props.color};
  transition: all 300ms;
  &:hover {
    transform: scale(1.3);
  }

  @media (min-width: 992px) {
    margin-right: 10rem;
  }
`;
