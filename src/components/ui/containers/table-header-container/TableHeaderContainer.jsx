import { TableHeaderContainerStyled } from './TableHeaderContainer.styled';

export function TableHeaderContainer({ children, className }) {
  return (
    <TableHeaderContainerStyled className={className}>
      {children}
    </TableHeaderContainerStyled>
  );
}

TableHeaderContainer.defaultProps = {
  className: null,
};
