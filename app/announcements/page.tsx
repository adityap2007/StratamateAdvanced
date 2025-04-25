'use client';

import { useState } from 'react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
  author: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'Building Maintenance Notice',
      content: 'The water supply will be interrupted on Saturday, March 30th, from 10 AM to 2 PM for scheduled maintenance.',
      priority: 'high',
      date: '2024-03-25',
      author: 'Building Manager'
    },
    {
      id: 2,
      title: 'Community BBQ Event',
      content: 'Join us for a community BBQ on the rooftop garden this Sunday! Bring your own drinks.',
      priority: 'medium',
      date: '2024-03-24',
      author: 'Social Committee'
    },
    {
      id: 3,
      title: 'New Recycling Guidelines',
      content: 'Please review the updated recycling guidelines posted in the waste room.',
      priority: 'low',
      date: '2024-03-23',
      author: 'Environmental Committee'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    author: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const announcement = {
      id: Date.now(),
      ...newAnnouncement,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({
      title: '',
      content: '',
      priority: 'medium',
      author: ''
    });
    setShowForm(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          {showForm ? 'Cancel' : 'New Announcement'}
        </button>
      </div>

      {/* New Announcement Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                className="w-full p-2 border rounded"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({
                    ...newAnnouncement,
                    priority: e.target.value as 'high' | 'medium' | 'low'
                  })}
                  className="w-full p-2 border rounded"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <input
                  type="text"
                  value={newAnnouncement.author}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, author: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
            >
              Post Announcement
            </button>
          </div>
        </form>
      )}

      {/* Announcements List */}
      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{announcement.title}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(announcement.priority)}`}
              >
                {announcement.priority}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-wrap">
              {announcement.content}
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Posted by: {announcement.author}</span>
              <span>{new Date(announcement.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 