import React from 'react';
import { TableActionsStyled } from './TableActionsContainer.styled';

export function TableActionsContainer({ children, className }) {
  return (
    <TableActionsStyled className={className}>{children}</TableActionsStyled>
  );
}

TableActionsContainer.defaultProps = {
  className: null,
};
