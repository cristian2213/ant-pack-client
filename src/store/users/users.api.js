import { axiosClient } from 'config/index';

const HTTP_SERVICE = 'users';

export async function getUsers(params) {
  try {
    const res = await axiosClient.get(HTTP_SERVICE, { params });
    return res.data.data;
  } catch {
    return null;
  }
}

export async function deleteUser(id) {
  try {
    const res = await axiosClient.delete(`${HTTP_SERVICE}/${id}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function createUser(payload) {
  try {
    const res = await axiosClient.post(HTTP_SERVICE, payload);
    return res.data;
  } catch {
    return null;
  }
}

export async function uploadAvatar(formData) {
  try {
    const res = await axiosClient.post(
      `${HTTP_SERVICE}/upload-avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return res.data.location;
  } catch {
    return null;
  }
}

export async function updateUser(id, payload) {
  try {
    const res = await axiosClient.patch(`${HTTP_SERVICE}/${id}`, payload);
    if (res.data.statusCode !== 201) return null;

    return res.data;
  } catch {
    return null;
  }
}

export async function validateUniqueField(payload) {
  try {
    const res = await axiosClient.post(
      `${HTTP_SERVICE}/validate/unique`,
      payload
    );

    return res.data;
  } catch {
    return null;
  }
}
