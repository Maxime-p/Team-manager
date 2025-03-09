import { FC } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Bell, Calendar, Users, Info } from 'lucide-react';
import type { Notification } from '../lib/directus';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const NotificationList: FC<NotificationListProps> = ({ notifications, onMarkAsRead }) => {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'event':
        return <Calendar className="h-6 w-6 text-blue-500" />;
      case 'availability':
        return <Users className="h-6 w-6 text-green-500" />;
      default:
        return <Info className="h-6 w-6 text-gray-500" />;
    }
  };

  const getNotificationColor = (status: Notification['status']) => {
    return status === 'unread' ? 'bg-indigo-50' : 'bg-white';
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {notifications.map((notification, notificationIdx) => (
          <li key={notification.id}>
            <div className="relative pb-8">
              {notificationIdx !== notifications.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className={`relative flex space-x-3 ${getNotificationColor(notification.status)} p-4 rounded-lg`}>
                <div>
                  <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
                    {getNotificationIcon(notification.type)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <div className="flex space-x-2">
                      {notification.status === 'unread' && (
                        <button
                          type="button"
                          onClick={() => onMarkAsRead(notification.id)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Marquer comme lu
                        </button>
                      )}
                      <time
                        dateTime={notification.created_at}
                        className="text-xs text-gray-500"
                      >
                        {format(new Date(notification.created_at), 'Pp', { locale: fr })}
                      </time>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{notification.message}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;