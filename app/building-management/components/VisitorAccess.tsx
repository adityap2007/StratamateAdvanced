'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function VisitorAccess() {
  const [formData, setFormData] = useState({
    visitorId: '',
    unitNumber: '',
    purpose: 'guest',
    duration: 4
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    setQrCode('');

    try {
      const response = await fetch('/api/visitor-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer VISITOR_TEST_TOKEN' // In production, use a proper token
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate visitor access');
      }

      setStatus('success');
      setQrCode(data.data.qrCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Visitor ID</label>
        <input
          type="text"
          value={formData.visitorId}
          onChange={(e) => setFormData({ ...formData, visitorId: e.target.value })}
          placeholder="Enter visitor ID"
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Unit Number</label>
        <input
          type="text"
          value={formData.unitNumber}
          onChange={(e) => setFormData({ ...formData, unitNumber: e.target.value })}
          placeholder="e.g., 12/03"
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Purpose</label>
        <select
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option value="guest">Guest</option>
          <option value="maintenance">Maintenance</option>
          <option value="delivery">Delivery</option>
          <option value="inspection">Inspection</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Duration (hours)</label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          min="1"
          max="24"
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {status === 'loading' ? 'Generating Access...' : 'Generate Access'}
      </button>

      {status === 'success' && qrCode && (
        <div className="p-4 bg-green-100 text-green-700 rounded-md text-center">
          <p className="mb-2">Access granted successfully!</p>
          <div className="bg-white p-4 rounded-md inline-block">
            {/* In a real app, display actual QR code image */}
            <div className="w-32 h-32 bg-gray-200 mx-auto flex items-center justify-center text-sm text-gray-600">
              QR Code
            </div>
          </div>
          <p className="mt-2 text-sm">Scan this QR code for access</p>
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