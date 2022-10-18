import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Logo } from 'components';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_ROUTES } from 'config';
import { SiderStyled } from './Sider.styled';

export function Sider() {
  const navigate = useNavigate();

  const handleSection = (e) => navigate(e.key);

  const sections = [
    {
      key: DEFAULT_ROUTES.dashboard.childrens.users,
      icon: <UserOutlined />,
      label: 'Usuarios',
    },
  ];

  return (
    <SiderStyled collapsed>
      <Logo />
      <Menu
        onClick={handleSection}
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['usuarios']}
        items={sections}
      />
    </SiderStyled>
  );
}
