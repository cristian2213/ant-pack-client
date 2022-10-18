import { notification } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

export const openNotification = (status, description, CustomIcon) => {
  if (status === 'error') {
    const errorColor = { color: '#e03131' };
    notification.error({
      message: 'Operación Fallida',
      description,
      icon: (
        <>
          {CustomIcon != null ? (
            <CustomIcon style={errorColor} />
          ) : (
            <CloudUploadOutlined style={errorColor} />
          )}
        </>
      ),
    });
    return;
  }

  if (status === 'success') {
    const successColor = {
      color: '#52c41a',
    };
    notification.success({
      message: 'Operación Exitosa',
      description,
      icon: (
        <>
          {CustomIcon != null ? (
            <CustomIcon style={successColor} />
          ) : (
            <CloudUploadOutlined style={successColor} />
          )}
        </>
      ),
    });
    return;
  }
  throw new Error("status param doesn't exist");
};
