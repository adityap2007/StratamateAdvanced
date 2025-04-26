'use client';

import { useState, useEffect } from 'react';
import { env } from '../lib/env';
import { supabase } from '../../lib/db';

interface Statistics {
  total_residents: number;
  maintenance_requests: {
    total: number;
    high_priority: number;
  };
  payments: {
    monthly_count: number;
    monthly_amount: number;
  };
}

export default function StatisticsPage() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Additional metrics
  const [noticeCount, setNoticeCount] = useState<number>(0);
  const [eventCount, setEventCount] = useState<number>(0);
  const [messageCount, setMessageCount] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${env.apiUrl}/statistics.php`);
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        const data = await response.json();
        setStats(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Fetch other metrics
    const fetchCounts = async () => {
      try {
        const { data: notices } = await supabase.from('notices').select('id');
        setNoticeCount(notices?.length || 0);
        const { data: events } = await supabase.from('events').select('id');
        setEventCount(events?.length || 0);
        const { data: messages } = await supabase.from('contact_messages').select('id');
        setMessageCount(messages?.length || 0);
      } catch (err) {
        console.error('Error fetching counts:', err);
      }
    };
    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-600">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Building Statistics</h1>
      
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Residents Card */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Residents</h2>
            <div className="text-3xl font-bold text-blue-600">
              {stats.total_residents}
            </div>
            <p className="text-gray-600 mt-2">Total registered residents</p>
          </div>

          {/* Maintenance Requests Card */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Maintenance</h2>
            <div className="space-y-2">
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  {stats.maintenance_requests.total}
                </div>
                <p className="text-gray-600">Total requests</p>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-red-600">
                  {stats.maintenance_requests.high_priority}
                </div>
                <p className="text-gray-600">High priority</p>
              </div>
            </div>
          </div>

          {/* Payments Card */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Monthly Payments</h2>
            <div className="space-y-2">
              <div>
                <div className="text-3xl font-bold text-green-600">
                  ${stats.payments.monthly_amount.toLocaleString()}
                </div>
                <p className="text-gray-600">Total amount</p>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.payments.monthly_count}
                </div>
                <p className="text-gray-600">Number of payments</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Metrics */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Other Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Notices Posted</h3>
            <div className="text-3xl font-bold text-purple-600">{noticeCount}</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Community Events</h3>
            <div className="text-3xl font-bold text-indigo-600">{eventCount}</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Messages Received</h3>
            <div className="text-3xl font-bold text-teal-600">{messageCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
