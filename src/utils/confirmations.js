import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const confirmationModal = (
  title,
  content,
  okText,
  okType,
  cancelText,
  Icon,
  cb
) => {
  Modal.confirm({
    title: title ?? '¿Esta seguro de eliminar el registro?',
    icon: Icon !== null ? Icon : <ExclamationCircleOutlined />,
    content:
      content ?? 'Por favor, Recuerda que está acción no tiene regresión.',
    okText: okText ?? 'Eliminar',
    okType: okType ?? 'danger',
    cancelText: cancelText ?? 'Cancelar',
    onOk: cb,
  });
};

confirmationModal.defaultProps = {
  title: null,
  content: null,
  okText: null,
  okType: null,
  cancelText: null,
  Icon: null,
};
