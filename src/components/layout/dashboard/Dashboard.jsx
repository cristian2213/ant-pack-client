import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header, Sider, Footer } from 'components';
import { LayoutStyled, ContentStyled } from './Dashboard.styled';

export function Dashboard() {
  return (
    <LayoutStyled>
      <Sider />
      <Layout>
        <Header />
        <ContentStyled>
          <Outlet />
        </ContentStyled>
        <Footer />
      </Layout>
    </LayoutStyled>
  )
}
