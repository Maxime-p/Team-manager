import { FC, useState } from 'react';
import { Calendar, Clock, MapPin, Type } from 'lucide-react';
import type { Event } from '../lib/directus';

interface EventFormProps {
  onSubmit: (event: Partial<Event>) => void;
  initialData?: Partial<Event>;
}

const EventForm: FC<EventFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    type: 'training',
    is_recurring: false,
    ...initialData,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titre
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="title"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <div className="mt-1">
          <textarea
            id="description"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
            Date de début
          </label>
          <div className="mt-1 relative">
            <input
              type="datetime-local"
              id="start_date"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            />
            <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
            Date de fin
          </label>
          <div className="mt-1 relative">
            <input
              type="datetime-local"
              id="end_date"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            />
            <Clock className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Lieu
        </label>
        <div className="mt-1 relative">
          <input
            type="text"
            id="location"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          <MapPin className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type d'événement
        </label>
        <div className="mt-1 relative">
          <select
            id="type"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as Event['type'] })}
          >
            <option value="training">Entraînement</option>
            <option value="match">Match</option>
            <option value="meeting">Réunion</option>
          </select>
          <Type className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_recurring"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={formData.is_recurring}
          onChange={(e) => setFormData({ ...formData, is_recurring: e.target.checked })}
        />
        <label htmlFor="is_recurring" className="ml-2 block text-sm text-gray-700">
          Événement récurrent
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
};

export default EventForm;