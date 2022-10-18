import { useState } from 'react';
import { IoAddSharp } from 'react-icons/io5';
import { TableSearcher, TableHeaderContainer, TabBtn } from 'components';
import { UsersForm } from '../users-form/UsersForm';

export function UsersHeader({ searching, onFetch }) {
  const ICON_SIZE = 28;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (formData) => {
    const { column, searching: searchingInput } = formData;

    if (
      !column ||
      column === undefined ||
      !searchingInput ||
      searchingInput === undefined
    ) {
      searching.current = {};
      return;
    }

    const newSearching = {
      searchingCol: column,
      searchingVal: searchingInput.trim().split(' ').join('-'),
    };

    searching.current = newSearching;

    onFetch({
      page: 1,
      limit: 10,
    });
  };

  const columns = [
    { name: 'Nombre', key: 'name', type: 'string' },
    { name: 'Email', key: 'email', type: 'string' },
    { name: 'Ciudad', key: 'address.city', type: 'string' },
    { name: 'Compañia', key: 'company.name', type: 'string' },
  ];

  const toggleModal = () => setIsModalOpen((preValue) => !preValue);

  return (
    <>
      <UsersForm
        onToggle={toggleModal}
        isOpen={isModalOpen}
        onFetch={onFetch}
      />

      <TableHeaderContainer>
        <TabBtn onClick={toggleModal}>
          <IoAddSharp size={ICON_SIZE} />
          <span>Crear</span>
        </TabBtn>

        <TableSearcher
          columns={columns}
          onSubmit={handleSearch}
          searching={searching}
          onFetch={onFetch}
          defaultValues={{}}
        />
      </TableHeaderContainer>
    </>
  );
}
