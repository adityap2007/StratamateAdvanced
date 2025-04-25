'use client';

import { useState } from 'react';

export default function MaintenancePage() {
  const [requests, setRequests] = useState<Array<{
    id: number;
    status: string;
    date: string;
    title: string;
    description: string;
    priority: string;
    location: string;
  }>>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'low',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      ...formData,
      id: Date.now(),
      status: 'pending',
      date: new Date().toLocaleDateString()
    };
    setRequests((prevRequests) => [...prevRequests, newRequest]);
    setFormData({ title: '', description: '', priority: 'low', location: '' });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Maintenance</h1>
      <p className="text-gray-600">
        Submit and track maintenance requests for your property.
      </p>
      <div className="grid gap-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Submit Request</h2>
          <p className="text-gray-600">Report maintenance issues or request repairs.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Track Status</h2>
          <p className="text-gray-600">View the status of your maintenance requests.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">History</h2>
          <p className="text-gray-600">Access past maintenance records and resolutions.</p>
        </div>
      </div>
    </div>
  );
} 