import { FC } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, MapPin } from 'lucide-react';
import type { Event } from '../lib/directus';

interface EventListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const EventList: FC<EventListProps> = ({ events, onEventClick }) => {
  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'training':
        return 'bg-green-100 text-green-800';
      case 'match':
        return 'bg-blue-100 text-blue-800';
      case 'meeting':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeLabel = (type: Event['type']) => {
    switch (type) {
      case 'training':
        return 'Entraînement';
      case 'match':
        return 'Match';
      case 'meeting':
        return 'Réunion';
      default:
        return type;
    }
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id} className="cursor-pointer" onClick={() => onEventClick(event)}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-100">
                    <Calendar className="h-5 w-5 text-gray-500" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{event.title}</span>
                    </p>
                    <div className="mt-2 text-sm text-gray-700">{event.description}</div>
                    {event.location && (
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        {event.location}
                      </div>
                    )}
                  </div>
                  <div className="whitespace-nowrap text-right text-sm">
                    <time dateTime={event.start_date}>
                      {format(new Date(event.start_date), 'PPp', { locale: fr })}
                    </time>
                    <div
                      className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getEventTypeColor(
                        event.type
                      )}`}
                    >
                      {getEventTypeLabel(event.type)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;