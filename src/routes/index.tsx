import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/dashboard';
import Marathons from '../pages/Marathons';
import MarathonDetails from '../pages/MarathonDetails';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Terms from '../pages/Terms';
import { Suspense } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const withSuspense = (Component: React.ComponentType<any>) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: withSuspense(Home),
      },
      {
        path: '/login',
        element: withSuspense(Login),
      },
      {
        path: '/register',
        element: withSuspense(Register),
      },
      {
        path: '/marathons',
        element: withSuspense(Marathons),
      },
      {
        path: '/marathons/:id',
        element: withSuspense(MarathonDetails),
      },
      {
        path: '/about',
        element: withSuspense(About),
      },
      {
        path: '/contact',
        element: withSuspense(Contact),
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/terms',
        element: <Terms />,
      },
      {
        path: '/dashboard/*',
        element: (
          <PrivateRoute>
            {withSuspense(Dashboard)}
          </PrivateRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]); 