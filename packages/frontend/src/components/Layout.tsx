import { FC, ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Calendar, Users, Bell, LayoutDashboard, LogOut } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { directus, type Notification } from '../lib/directus';
import { useAuth } from '../lib/auth';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await directus.request(
        directus.items('notifications').readByQuery({
          sort: ['-created_at'],
          filter: {
            user_id: {
              _eq: user?.id,
            },
          },
        })
      );
      return response.data as Notification[];
    },
  });

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/planning', icon: Calendar, label: 'Planning' },
    { to: '/availability', icon: Users, label: 'Disponibilités' },
    { to: '/notifications', icon: Bell, label: 'Notifications', badge: notifications.filter(n => n.status === 'unread').length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navigation */}
      <nav className="bg-white border-b border-gray-200 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Team Manager</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map(({ to, icon: Icon, label, badge }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                    {badge ? (
                      <span className="ml-2 bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">
                        {badge}
                      </span>
                    ) : null}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pb-20 sm:pb-6">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 h-16">
          {navItems.map(({ to, icon: Icon, label, badge }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center space-y-1 ${
                  isActive
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {badge ? (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">{badge}</span>
                  </span>
                ) : null}
              </div>
              <span className="text-xs">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
