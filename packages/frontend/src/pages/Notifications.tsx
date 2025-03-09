import { FC, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { directus, type Notification } from '../lib/directus';
import NotificationList from '../components/NotificationList';

const Notifications: FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await directus.request(
        directus.items('notifications').readByQuery({
          sort: ['-created_at'],
          filter: {
            user_id: {
              _eq: 'current-user-id', // À remplacer par l'ID de l'utilisateur connecté
            },
            ...(filter === 'unread' ? { status: { _eq: 'unread' } } : {}),
          },
        })
      );
      return response.data as Notification[];
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      return directus.request(
        directus.items('notifications').updateOne(id, {
          status: 'read',
        })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };

  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      const unreadNotifications = notifications.filter((n) => n.status === 'unread');
      return Promise.all(
        unreadNotifications.map((notification) =>
          directus.request(
            directus.items('notifications').updateOne(notification.id, {
              status: 'read',
            })
          )
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
        <p className="mt-4 text-sm text-gray-500">Chargement des notifications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm text-gray-500">
            Consultez vos notifications et restez informé des événements importants
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex sm:space-x-3">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                filter === 'all'
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              Toutes
            </button>
            <button
              type="button"
              onClick={() => setFilter('unread')}
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                filter === 'unread'
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              Non lues
            </button>
          </div>
          {notifications.some((n) => n.status === 'unread') && (
            <button
              type="button"
              onClick={() => markAllAsReadMutation.mutate()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Tout marquer comme lu
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {notifications.length > 0 ? (
          <NotificationList
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
          />
        ) : (
          <div className="p-6 text-center">
            <p className="text-sm text-gray-500">Aucune notification à afficher</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;