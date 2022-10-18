import { useRoutes, Navigate } from 'react-router-dom';
import { Dashboard } from 'components';
import { UsersPage } from 'pages';
import { DEFAULT_ROUTES } from 'config/index';

export function Router() {
  const { dashboard } = DEFAULT_ROUTES;
  const { childrens } = dashboard;

  const routes = [
    {
      path: dashboard.value,

      element: <Dashboard />,
      children: [
        { path: '', element: <Navigate to='usuarios' replace /> },
        {
          path: childrens.users,
          element: <UsersPage />,
        },
      ],
    },
    {
      path: '*',
      element: (
        <Navigate to={`${dashboard.value}/${childrens.users}`} replace />
      ),
    },
  ];

  return useRoutes(routes);
}
