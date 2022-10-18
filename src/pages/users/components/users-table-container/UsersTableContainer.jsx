import { useState, useRef } from 'react';
import { getUsers } from 'store';
import { UsersTable } from '../users-table/UsersTable';
import { UsersHeader } from '../users-header/UsersHeader';

export function UsersTableContainer() {
  const searching = useRef({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchUsers = async (params = {}) => {
    setLoading(true);
    Object.assign(params, searching.current);

    const res = await getUsers(params);

    if (res == null) {
      setUsers([]);
      setLoading(false);
      return;
    }

    const { users: usersArr, total } = res;
    setUsers(usersArr);
    setPagination({
      current: params.page,
      pageSize: params.limit,
      total,
    });
    setLoading(false);
  };

  return (
    <>
      <UsersHeader searching={searching} onFetch={fetchUsers} />
      <UsersTable
        data={users}
        loading={loading}
        pagination={pagination}
        onFetch={fetchUsers}
      />
    </>
  );
}
