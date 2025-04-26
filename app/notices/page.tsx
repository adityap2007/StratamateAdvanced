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

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(fallbackNotices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotices() {
      try {
        setLoading(true);
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
    }
    fetchNotices();
  }, []);

  if (loading) return <div className="py-8 text-center">Loading notices...</div>;
  if (error) return <div className="p-4 bg-red-100 text-red-700 rounded">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notices & Announcements</h1>
      {notices.map(({ id, title, description }) => (
        <div key={id} className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      ))}
    </div>
  );
} 