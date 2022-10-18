import { Tooltip } from 'antd';
import { TabBtnContainer } from './TabBtn.styled';

export function TabBtn({ title, className, onClick, children }) {
  return (
    <Tooltip title={title}>
      <TabBtnContainer onClick={(e) => onClick(e)} className={className}>
        {children}
      </TabBtnContainer>
    </Tooltip>
  );
}

TabBtn.defaultProps = {
  title: null,
  className: null,
};
