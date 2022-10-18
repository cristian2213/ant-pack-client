import { useState, useEffect } from 'react';
import { Modal, Row, Col, Form, Input, Divider, Button } from 'antd';
import ImgCrop from 'antd-img-crop';
import { IoPersonAddSharp } from 'react-icons/io5';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ERROR, SUCCESS } from 'constants/index';
import { createUser, uploadAvatar, updateUser } from 'store/index';
import { openNotification, getBase64, mapUserData } from 'utils';
import { formValidation } from './form-rules';
import { UploadStyled } from './UsersForm.styled';

export function UsersForm({ onToggle, isOpen, isEdition, onFetch, user }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [oldFile, setOldFile] = useState(null);

  const props = {
    name: 'user-avatar',
    limit: 1,
    multiple: false,
    maxCount: 1,
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      const newFileName = file.name;
      const whiteList = ['image/jpeg', 'image/png'];
      if (!whiteList.includes(file.type)) return;
      if (fileList.length > 0) {
        const oldFileName = fileList[0].name;
        if (newFileName === oldFileName) return;
      }
      if (file.size / (1024 * 1024) > 1) {
        openNotification(
          ERROR,
          'La imagen debe ser menor a una 1 mega, por favor usa el siguiente enlace para reducir el tamaño de la image: "https://squoosh.app/"'
        );
        return;
      }
      setFileList([file]);
      return false;
    },
    fileList,
  };

  useEffect(() => {
    if (isEdition) {
      if (user == null) return;

      const { avatar, ...formData } = mapUserData(user);
      form.setFieldsValue(formData);
      if (avatar) {
        setFileList(avatar);
        setOldFile(avatar.length !== 0 ? avatar[0]?.name : null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, user]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };
  const handleCancel = () => setPreviewVisible(false);

  const handleSubmit = async (formData) => {
    setIsMakingRequest(true);
    const payload = { ...formData };

    if (isEdition) payload.avatar = user?.avatar ?? null;

    // Upload image to the server
    if (fileList.length > 0) {
      const newFile = fileList[0].name;
      if (oldFile !== newFile) {
        const iFormData = new FormData();
        iFormData.append('user-avatar', fileList[0]);
        const userImage = await uploadAvatar(iFormData);
        if (userImage == null) {
          openNotification(
            ERROR,
            'Carga de imagen fallida, Por favor verifica que la imagen sea png, jpeg or jpg con un tamaño menor a 1 mega.'
          );
          setIsMakingRequest(false);
          return;
        }
        payload['avatar'] = userImage;
      }
    }

    const mapPayload = (data) => {
      const mappedData = {
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        company: {
          name: data.companyName,
        },
        address: {
          street: data.street,
          suite: data.suite,
          city: data.city,
          zipcode: data.zipcode,
          geo: {
            lat: data.lat,
            lng: data.lng,
          },
        },
      };

      if (data.website) mappedData.website = data.website;
      if (data.catchPhrase) mappedData.company.catchPhrase = data.catchPhrase;
      if (data.bs) mappedData.company.bs = data.bs;
      if (data.avatar) mappedData.avatar = data.avatar;

      return mappedData;
    };

    let res;
    if (isEdition) res = await updateUser(user.id, mapPayload(payload));
    else res = await createUser(mapPayload(payload));

    setIsMakingRequest(false);

    if (res == null) {
      openNotification(
        ERROR,
        `Error al ${
          isEdition ? 'editar' : 'crear'
        } el usuario, por favor verifica los datos e intenta de nuevo.`,
        IoPersonAddSharp
      );
      return false;
    }

    openNotification(SUCCESS, '', IoPersonAddSharp);
    onFetch({
      page: 1,
      limit: 10,
    });
    setFileList([]);
    form.resetFields();
    onToggle();
  };

  return (
    <>
      {isEdition && (
        <Modal
          open={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt='avatar'
            style={{
              width: '100%',
            }}
            src={previewImage}
          />
        </Modal>
      )}

      <Modal
        okText='Crear'
        cancelText='Cancelar'
        title='Crear Usuario'
        open={isOpen}
        footer={null}
        onCancel={onToggle}
        width='80%'
        centered
      >
        <Form
          form={form}
          layout='vertical'
          size='middle'
          autoComplete='off'
          onFinish={handleSubmit}
          name='user-form'
        >
          <Row align='middle' justify='start' gutter={[32, 4]}>
            <Col xs={{ span: 6 }}>
              <Form.Item
                label='Nombre completo'
                required
                name='name'
                rules={formValidation.name}
              >
                <Input placeholder='Srinivasa Ramanujan' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 6 }}>
              <Form.Item
                label='Nombre de usuario'
                required
                name='username'
                rules={formValidation.username}
              >
                <Input placeholder='srinivasa22' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 6 }}>
              <Form.Item
                label='Email'
                required
                name='email'
                rules={formValidation.email}
              >
                <Input placeholder='srinivasa22@gmail.com' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 6 }}>
              <Form.Item
                label='Telefono'
                required
                name='phone'
                rules={formValidation.phone}
              >
                <Input placeholder='32289823232' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 6 }}>
              <Form.Item
                label='Sitio Web'
                name='website'
                rules={formValidation.website}
              >
                <Input placeholder='ildegard.org' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 6 }}>
              <Form.Item label='Avatar'>
                <ImgCrop rotate aspect={1} rules={[{ required: true }]}>
                  <UploadStyled
                    {...props}
                    listType='picture-card'
                    onPreview={handlePreview}
                    accept='.jpg, .jpeg, .png'
                  >
                    <CloudUploadOutlined />
                  </UploadStyled>
                </ImgCrop>
              </Form.Item>
            </Col>
            <Divider orientation='left' plain>
              Dirección
            </Divider>
            <Col xs={{ span: 6 }}>
              <Form.Item
                label='Calle'
                required
                name='street'
                rules={formValidation.street}
              >
                <Input placeholder='Kulas Light' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 6 }}>
              <Form.Item
                label='Suite'
                required
                name='suite'
                rules={formValidation.suite}
              >
                <Input placeholder='Apt. 556' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 6 }}>
              <Form.Item
                label='Ciudad'
                required
                name='city'
                rules={formValidation.city}
              >
                <Input placeholder='Gwenborough' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 6 }}>
              <Form.Item
                label='Código postal'
                required
                name='zipcode'
                rules={formValidation.zipcode}
              >
                <Input placeholder='92998-3874' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 6 }}>
              <Form.Item
                label='Latitud'
                required
                name='lat'
                rules={formValidation.lat}
              >
                <Input placeholder='-37.3159' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 6 }}>
              <Form.Item
                label='Longitud'
                required
                name='lng'
                rules={formValidation.lng}
              >
                <Input placeholder='81.1496' />
              </Form.Item>
            </Col>
            <Divider orientation='left' plain>
              Compañia
            </Divider>
            <Col xs={{ span: 6 }}>
              <Form.Item
                label='Nombre'
                required
                name='companyName'
                rules={formValidation.companyName}
              >
                <Input placeholder='Romaguera-Crona' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 6 }}>
              <Form.Item
                label='Eslogan'
                name='catchPhrase'
                rules={formValidation.catchPhrase}
              >
                <Input placeholder='ulti-layered client-server neural-net' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 6 }}>
              <Form.Item label='Bs' name='bs' rules={formValidation.bs}>
                <Input placeholder='harness real-time e-markets' />
              </Form.Item>
            </Col>

            <Col xs={{ span: 6 }}>
              <Form.Item label='Presione aquí para crear👇🏻'>
                <Button
                  type='primary'
                  htmlType='submit'
                  block
                  loading={isMakingRequest}
                >
                  {isEdition ? 'Editar' : 'Crear'}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

UsersForm.defaultProps = {
  isEdition: false,
  user: null,
};
