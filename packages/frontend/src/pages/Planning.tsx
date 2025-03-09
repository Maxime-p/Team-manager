import { FC, useState } from 'react';
import { Plus } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { directus, type Event } from '../lib/directus';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';

const Planning: FC = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const queryClient = useQueryClient();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await directus.request(
        directus.items('events').readByQuery({
          sort: ['-start_date'],
        })
      );
      return response.data as Event[];
    },
  });

  const createEventMutation = useMutation({
    mutationFn: async (newEvent: Partial<Event>) => {
      const response = await directus.request(
        directus.items('events').createOne(newEvent)
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setShowEventForm(false);
    },
  });

  const handleEventSubmit = (eventData: Partial<Event>) => {
    createEventMutation.mutate(eventData);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Planning</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos événements et votre calendrier d'équipe
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => {
              setSelectedEvent(null);
              setShowEventForm(true);
            }}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Nouvel événement
          </button>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {showEventForm ? (
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {selectedEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
              </h3>
              <EventForm
                onSubmit={handleEventSubmit}
                initialData={selectedEvent || undefined}
              />
            </div>
          ) : isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
              <p className="mt-4 text-sm text-gray-500">Chargement des événements...</p>
            </div>
          ) : (
            <EventList events={events} onEventClick={handleEventClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Planning;