import { validateUniqueField } from 'store/index';

export const formValidation = {
  name: [
    { transform: (value) => value.trim() },
    {
      required: true,
    },
    {
      min: 1,
    },
    { max: 150 },
  ],

  username: [
    { transform: (value) => value.trim() },
    {
      required: true,
    },
    {
      min: 6,
    },
    { max: 80 },
    (form) => ({
      async validator(_, value) {
        if (value == null || value === '') return false;

        const payload = {
          field: 'username',
          value,
        };
        const res = await validateUniqueField(payload);

        if (res === null)
          return Promise.reject(
            new Error('Error de validación, por favor comunícate con soporte.')
          );

        if (res.available === false) {
          const userId = form.getFieldValue('userId');
          if (res.id === userId) return Promise.resolve();
          return Promise.reject(new Error('El nombre de usuario ya existe.'));
        }
        return Promise.resolve();
      },
    }),
  ],

  email: [
    { transform: (value) => value.trim() },
    { type: 'email' },
    {
      required: true,
    },
    (form) => ({
      async validator(_, value) {
        if (value == null || value === '') return false;

        const payload = {
          field: 'email',
          value,
        };

        const res = await validateUniqueField(payload);
        if (res === null)
          return Promise.reject(
            new Error('Error de validación, por favor comunícate con soporte.')
          );

        if (res.available === false) {
          const userId = form.getFieldValue('userId');
          if (res.id === userId) return Promise.resolve();
          return Promise.reject(new Error('El email ya existe.'));
        }
        return Promise.resolve();
      },
    }),
  ],

  phone: [
    { transform: (value) => value.trim() },
    {
      type: 'string',
      required: true,
      pattern: /3[0-9]{9}$/gm,
      message: 'El telefono debe contender 10 números',
    },
    (form) => ({
      async validator(_, value) {
        const regex = /3[0-9]{9}$/gm;
        if (value == null || value === '' || !regex.test(value)) return false;

        const payload = {
          field: 'phone',
          value,
        };

        const res = await validateUniqueField(payload);
        if (res === null)
          return Promise.reject(
            new Error('Error de validación, por favor comunícate con soporte.')
          );

        if (res.available === false) {
          const userId = form.getFieldValue('userId');
          if (res.id === userId) return Promise.resolve();
          return Promise.reject(new Error('El telefono ya existe.'));
        }
        return Promise.resolve();
      },
    }),
  ],

  website: [
    { transform: (value) => value.trim() },
    { type: 'url' },
    {
      required: false,
    },
  ],

  street: [
    { transform: (value) => value.trim() },
    {
      required: true,
    },
    {
      min: 4,
    },
    { max: 100 },
  ],

  suite: [
    { transform: (value) => value.trim() },
    {
      required: true,
    },
    {
      min: 1,
    },
    { max: 100 },
  ],

  city: [
    { transform: (value) => value.trim() },
    {
      required: true,
    },
    {
      min: 2,
    },
    { max: 100 },
  ],

  zipcode: [
    { transform: (value) => value.trim() },
    { required: true },
    () => ({
      async validator(_, value) {
        const regex = /^\d{6}$/;
        if (value == null || value === '') return Promise.reject();

        if (regex.test(value)) return Promise.resolve();
        return Promise.reject(new Error('El código postal no es valido.'));
      },
    }),
  ],

  lat: [
    { transform: (value) => value.trim() },
    {
      required: true,
    },
    () => ({
      async validator(_, value) {
        if (value == null || value === '') return Promise.resolve();
        const latitude =
          /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;

        if (latitude.test(value)) return Promise.resolve();
        return Promise.reject(new Error('La latitud no es valida.'));
      },
    }),
  ],

  lng: [
    { transform: (value) => value.trim() },
    {
      required: true,
    },
    () => ({
      async validator(_, value) {
        if (value == null || value === '') return Promise.resolve();
        const longitude =
          /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

        if (longitude.test(value)) return Promise.resolve();
        return Promise.reject(new Error('La longitud no es valida.'));
      },
    }),
  ],

  companyName: [
    { transform: (value) => value.trim() },
    {
      required: true,
    },
    { min: 2 },
    { max: 244 },
  ],

  catchPhrase: [
    { transform: (value) => value.trim() },
    {
      required: false,
    },
    { min: 2 },
    { max: 255 },
  ],

  bs: [
    { transform: (value) => value?.trim() ?? '' },
    {
      required: false,
    },
    { min: 2 },
    { max: 255 },
  ],
};
