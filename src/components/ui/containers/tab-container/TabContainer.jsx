import { TabContainerStyled } from './TabContainer.styled';

export function TabContainer({ children, className }) {
  return (
    <TabContainerStyled className={className}>{children}</TabContainerStyled>
  );
}
TabContainer.defaultProps = {
  className: null,
};
