import { Row, Col, Tabs } from 'antd';
import { TabContainer } from 'components';
import { IoPeople } from 'react-icons/io5';
import { UsersTableContainer } from '../users-table-container/UsersTableContainer';

export function UsersContainer() {
  const tabItems = [
    {
      key: 'usuarios',
      label: (
        <TabContainer>
          <IoPeople size={24} />
          <span>Usuarios</span>
        </TabContainer>
      ),
      children: <UsersTableContainer />,
    },
  ];

  return (
    <Row justify='center' align='middle'>
      <Col xs={{ span: 23 }}>
        <Tabs items={tabItems} defaultActiveKey='usuarios' />
      </Col>
    </Row>
  );
}
