import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeTitles: Record<string, string> = {
  '/': 'Home',
  '/marathons': 'All Marathons',
  '/dashboard': 'Dashboard',
  '/dashboard/my-marathons': 'My Marathons',
  '/dashboard/my-applications': 'My Applications',
  '/dashboard/add-marathon': 'Create Marathon',
  '/login': 'Login',
  '/register': 'Register',
};

export const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = 'RunLytic';

    // Check for dynamic routes like /marathons/:id
    if (path.match(/^\/marathons\/[^/]+$/)) {
      title = 'Marathon Details - RunLytic';
    } else {
      const routeTitle = routeTitles[path];
      if (routeTitle) {
        title = `${routeTitle} - RunLytic`;
      }
    }

    document.title = title;
  }, [location]);
}; 