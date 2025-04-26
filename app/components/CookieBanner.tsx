'use client';

import { useState, useEffect } from 'react';

// Helper to inject Google Analytics script
function initAnalytics() {
  if (window.gtag) return; // already initialized
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXX';
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}  
  window.gtag = gtag;  
  gtag('js', new Date());
  gtag('config', 'G-XXXXXX');
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cookieConsent');
      if (stored) {
        const { analytics } = JSON.parse(stored);
        if (analytics) initAnalytics();
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({ analytics: analyticsChecked }));
    if (analyticsChecked) initAnalytics();
    setVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({ analytics: false }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <p className="text-sm text-gray-800 dark:text-gray-200">
          We use cookies for site functionality and optional analytics tracking. Choose your preference.
        </p>
        <div className="mt-4 flex items-center space-x-3">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={analyticsChecked}
              onChange={(e) => setAnalyticsChecked(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Enable analytics cookies</span>
          </label>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
          >
            Decline analytics
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Accept and continue
          </button>
        </div>
      </div>
    </div>
  );
} 