import { FC } from 'react';
import { Bell } from 'lucide-react';
import type { Notification } from '../lib/directus';

interface NotificationBadgeProps {
  notifications: Notification[];
}

const NotificationBadge: FC<NotificationBadgeProps> = ({ notifications }) => {
  const unreadCount = notifications.filter((n) => n.status === 'unread').length;

  return (
    <div className="relative">
      <Bell className="h-6 w-6 text-gray-500" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
          <span className="text-xs font-medium text-white">{unreadCount}</span>
        </span>
      )}
    </div>
  );
};

export default NotificationBadge;