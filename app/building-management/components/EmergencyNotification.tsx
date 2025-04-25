'use client';

import { useState } from 'react';

export default function EmergencyNotification() {
  const [formData, setFormData] = useState({
    type: 'fire',
    message: '',
    buildingSection: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/emergency-notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send notification');
      }

      setStatus('success');
      setFormData({ type: 'fire', message: '', buildingSection: '' });
      
      // Reset success status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Emergency Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option value="fire">Fire</option>
          <option value="security">Security</option>
          <option value="maintenance">Maintenance</option>
          <option value="natural-disaster">Natural Disaster</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Building Section</label>
        <input
          type="text"
          value={formData.buildingSection}
          onChange={(e) => setFormData({ ...formData, buildingSection: e.target.value })}
          placeholder="e.g., Block A, Floor 3"
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Describe the emergency..."
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          rows={3}
          required
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full py-2 px-4 rounded-md font-medium text-white ${
          status === 'loading'
            ? 'bg-gray-400'
            : formData.type === 'fire'
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {status === 'loading' ? 'Sending...' : 'Send Emergency Alert'}
      </button>

      {status === 'success' && (
        <div className="p-3 bg-green-100 text-green-700 rounded-md">
          Emergency notification sent successfully!
        </div>
      )}

      {status === 'error' && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </form>
  );
} 