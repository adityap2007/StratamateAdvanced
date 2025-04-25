'use client';

import { useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Community BBQ',
      date: '2024-04-15',
      time: '12:00',
      location: 'Rooftop Garden',
      description: 'Join us for our monthly community BBQ!',
      attendees: 32
    },
    {
      id: 2,
      title: 'Residents Meeting',
      date: '2024-04-20',
      time: '18:30',
      location: 'Common Room',
      description: 'Monthly residents meeting to discuss building matters.',
      attendees: 25
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id' | 'attendees'>>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const event = {
      ...newEvent,
      id: Date.now(),
      attendees: 0
    };
    setEvents([...events, event]);
    setNewEvent({ title: '', date: '', time: '', location: '', description: '' });
    setShowForm(false);
  };

  const handleAttend = (eventId: number) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, attendees: event.attendees + 1 }
        : event
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Community Events</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Event'}
        </button>
      </div>

      {/* New Event Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Event Title</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                className="w-full p-2 border rounded"
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
            >
              Create Event
            </button>
          </div>
        </form>
      )}

      {/* Events List */}
      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Time: {event.time}</p>
                  <p>Location: {event.location}</p>
                  <p>Attendees: {event.attendees}</p>
                </div>
              </div>
              <button
                onClick={() => handleAttend(event.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Attend
              </button>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No upcoming events
        </div>
      )}
    </div>
  );
} 