import { useEffect, useRef } from 'react';
import { Table, Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UsersTableActions } from '../users-table-actions/UsersTableActions';

export function UsersTable({ data, loading, pagination, onFetch }) {
  const effectRan = useRef(false);

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: 'Ciudad',
      key: 'address',
      dataIndex: 'address',
      sorter: (a, b) => a.city - b.city,
      render: (value) => value?.city ?? '',
    },
    {
      title: 'Compañia',
      key: 'company',
      dataIndex: 'company',
      sorter: (a, b) => a.company - b.company,
      render: (value) => value?.name ?? '',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (value) => {
        if (value != null) return <Avatar src={<Image src={value} />} />;

        return <Avatar icon={<UserOutlined />} />;
      },
    },
    {
      title: 'Acciones',
      render: (user) => (
        <UsersTableActions
          user={user}
          users={data}
          pagination={pagination}
          onFetch={onFetch}
        />
      ),
    },
  ];

  const handleTableChange = (newPagination, _filters, sorter) => {
    const { current: page, pageSize: limit } = newPagination;
    onFetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      page,
      limit,
    });
  };

  useEffect(() => {
    if (effectRan.current === false) {
      onFetch({
        limit: pagination.pageSize,
        page: pagination.current,
      });
      return () => {
        effectRan.current = true;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table
      size='middle'
      columns={columns}
      rowKey={(row) => row.id}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      scroll={{ x: true }}
    />
  );
}
