'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/db';

interface Notice {
  id: number;
  title: string;
  description: string;
}

const fallbackNotices = [
  { id: 1, title: 'Building Updates', description: 'View the latest building maintenance and improvement updates.' },
  { id: 2, title: 'Community Announcements', description: 'Read important announcements from the strata committee.' },
  { id: 3, title: 'Emergency Notices', description: 'Access critical information and emergency notifications.' }
];

const LoadingSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-8 w-48 bg-gray-200 rounded"></div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="p-4 border rounded-lg">
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

const ErrorDisplay = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
    <div className="flex items-center mb-4">
      <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-lg font-semibold text-red-700">Error Loading Notices</h3>
    </div>
    <p className="text-red-600 mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
    >
      Try Again
    </button>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-12">
    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notices Available</h3>
    <p className="text-gray-600">Check back later for updates.</p>
  </div>
);

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(fallbackNotices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      setNotices(data.length > 0 ? data : fallbackNotices);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error} onRetry={fetchNotices} />;
  if (notices.length === 0) return <EmptyState />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notices & Announcements</h1>
      {notices.map(({ id, title, description }) => (
        <div key={id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      ))}
    </div>
  );
} 