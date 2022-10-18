import { Form, Select, Input, Button, Tooltip } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { TableSearcherStyled } from './TableSearcher.styled';

export function TableSearcher({
  columns,
  onSubmit,
  searching,
  onFetch,
  defaultValues,
}) {
  const [form] = Form.useForm();

  const resetForm = () => {
    searching.current = {};
    form.resetFields();
    onFetch();
  };

  return (
    <TableSearcherStyled
      size='large'
      layout='inline'
      form={form}
      onFinish={onSubmit}
      initialValues={defaultValues}
    >
      <div className='form__field-container'>
        <Form.Item name='column' className='form__field-column'>
          <Select
            placeholder='Seleccionar columna'
            style={{ minWidth: '20rem' }}
            allowClear
          >
            {columns.map((column, i) => (
              <Select.Option value={column.key} key={i}>
                {column.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='searching' className='form__field-searching'>
          <Input placeholder='Buscar...' allowClear autoComplete='off' />
        </Form.Item>

        <div className='form__actions-container'>
          <Tooltip title='Buscar'>
            <Button
              type='primary'
              htmlType='submit'
              icon={<SearchOutlined />}
              className='form__btn-submit'
            />
          </Tooltip>

          <Tooltip title='Limpiar Filtro'>
            <Button
              type='primary'
              htmlType='button'
              icon={<ClearOutlined />}
              onClick={resetForm}
              className='form__btn-clear'
            />
          </Tooltip>
        </div>
      </div>
    </TableSearcherStyled>
  );
}
