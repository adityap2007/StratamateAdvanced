'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/db';

export default function UserLoginModal() {
  const [visible, setVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Show modal only once per session
    if (!localStorage.getItem('userLoginPrompted')) {
      setVisible(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const regex = /^\d{4}$/;
    if (!regex.test(userId)) {
      setError('Please enter a valid 4-digit User ID.');
      return;
    }
    // Log login event to Supabase
    const { error: supaError } = await supabase
      .from('logins')
      .insert([{ user_id: userId }]);
    if (supaError) {
      setError('Failed to log you in. Try again.');
    } else {
      localStorage.setItem('userLoginPrompted', 'true');
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm mx-4">
        <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Enter your 4-digit User ID:</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            maxLength={4}
            className="border rounded p-2 mb-2 text-center"
            placeholder="0000"
          />
          {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
} 