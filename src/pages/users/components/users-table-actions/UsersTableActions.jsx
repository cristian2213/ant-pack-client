import { useState } from 'react';
import { Tooltip } from 'antd';
import { useTheme } from 'styled-components';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteUser } from 'store';
import { confirmationModal, executeAndUpdateTableRecords } from 'utils';
import { TableActionsContainer, TableActionContainer } from 'components';
import { UsersForm } from '../users-form/UsersForm';

export function UsersTableActions({ user, users, pagination, onFetch }) {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getColor = (color, intensity) => theme.colors[color][intensity];

  const handleElimination = async () => {
    await executeAndUpdateTableRecords(
      users,
      () => deleteUser(user.id),
      pagination,
      {
        failed:
          'Eliminación fallido, Por favor recarga la página e intenta nuevamente.',
        success: 'Usuario eliminado exitosamente.',
      },
      onFetch,
      DeleteOutlined
    );
  };
  const deleteOptions = [
    null,
    null,
    null,
    null,
    null,
    <DeleteOutlined style={{ color: getColor('red', '6') }} />,
    () => handleElimination(),
  ];

  const toggleModal = () => setIsModalOpen((preValue) => !preValue);
  return (
    <>
      <UsersForm
        onToggle={toggleModal}
        isOpen={isModalOpen}
        onFetch={onFetch}
        isEdition={true}
        user={user}
      />

      <TableActionsContainer>
        <Tooltip title='Editar Usuario'>
          <TableActionContainer onClick={toggleModal}>
            <EditOutlined style={{ color: getColor('yellow', '6') }} />
          </TableActionContainer>
        </Tooltip>

        <Tooltip title='Eliminar Usuario'>
          <TableActionContainer
            onClick={() => confirmationModal(...deleteOptions)}
          >
            <DeleteOutlined style={{ color: getColor('red', '6') }} />
          </TableActionContainer>
        </Tooltip>
      </TableActionsContainer>
    </>
  );
}
