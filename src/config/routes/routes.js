const ROUTES = {
  login: '/iniciar-sesion',
  dashboard: {
    value: '/dashboard',
    childrens: {
      users: 'usuarios',
    },
  },
};

export const DEFAULT_ROUTES = Object.freeze(ROUTES);
