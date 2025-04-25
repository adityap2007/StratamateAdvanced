'use client';

import { useState, useEffect } from 'react';

type AreaOccupancy = {
  areaId: string;
  currentOccupancy: number;
  occupancyPercentage: number;
  status: string;
};

export default function OccupancyTracker() {
  const [areas, setAreas] = useState<{ [key: string]: AreaOccupancy }>({
    gym: { areaId: 'gym', currentOccupancy: 0, occupancyPercentage: 0, status: 'normal' },
    pool: { areaId: 'pool', currentOccupancy: 0, occupancyPercentage: 0, status: 'normal' },
    lobby: { areaId: 'lobby', currentOccupancy: 0, occupancyPercentage: 0, status: 'normal' },
  });
  const [selectedArea, setSelectedArea] = useState('gym');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleAction = async (action: 'enter' | 'exit') => {
    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/occupancy-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          areaId: selectedArea,
          action,
          deviceId: 'manual-entry',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update occupancy');
      }

      setAreas(prev => ({
        ...prev,
        [selectedArea]: data.data,
      }));

      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStatus('error');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Select Area</label>
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          {Object.keys(areas).map((areaId) => (
            <option key={areaId} value={areaId}>
              {areaId.charAt(0).toUpperCase() + areaId.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">
            {areas[selectedArea].currentOccupancy}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Current Occupancy</div>
        </div>
        <div className="mt-2 text-center">
          <span className={`text-sm font-medium ${getStatusColor(areas[selectedArea].status)}`}>
            {areas[selectedArea].occupancyPercentage}% Capacity
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleAction('enter')}
          disabled={status === 'loading'}
          className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          Enter
        </button>
        <button
          onClick={() => handleAction('exit')}
          disabled={status === 'loading'}
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          Exit
        </button>
      </div>

      {status === 'success' && (
        <div className="p-3 bg-green-100 text-green-700 rounded-md">
          Occupancy updated successfully!
        </div>
      )}

      {status === 'error' && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
} 