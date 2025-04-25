'use client';

import { useState } from 'react';

export default function FormDemoPage() {
  const [message, setMessage] = useState('');

  // Handle GET request form
  const handleGetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const queryParams = new URLSearchParams(formData as any).toString();
    // Demonstrate GET request by appending query parameters to URL
    window.location.search = queryParams;
  };

  // Handle POST request form
  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch('/api/form-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Form submitted successfully!');
      } else {
        setMessage('Error submitting form');
      }
    } catch (error) {
      setMessage('Error submitting form');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">HTTP Request Demo</h1>

      {/* GET Request Form */}
      <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">GET Request Form</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This form demonstrates a GET request. Notice how the form data appears in the URL.
        </p>
        <form onSubmit={handleGetSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Submit (GET)
          </button>
        </form>
      </section>

      {/* POST Request Form */}
      <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">POST Request Form</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This form demonstrates a POST request. The data is sent in the request body, not visible in the URL.
        </p>
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              rows={4}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
          >
            Submit (POST)
          </button>
        </form>
        {message && (
          <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded">
            {message}
          </div>
        )}
      </section>

      {/* HTTP Information Section */}
      <section className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">HTTP Requests Explained</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-2">GET vs POST Requests</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                <strong>GET Requests:</strong>
                <ul className="list-circle pl-6 mt-1">
                  <li>Data is sent as query parameters in the URL</li>
                  <li>Visible in browser history and bookmarks</li>
                  <li>Limited data length (URL length restrictions)</li>
                  <li>Should only be used for retrieving data</li>
                  <li>Can be cached</li>
                </ul>
              </li>
              <li>
                <strong>POST Requests:</strong>
                <ul className="list-circle pl-6 mt-1">
                  <li>Data is sent in the request body</li>
                  <li>Not visible in URL or browser history</li>
                  <li>No size limitations</li>
                  <li>Used for submitting data to be processed</li>
                  <li>Cannot be cached</li>
                </ul>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">Common HTTP Status Codes</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong>2xx Success</strong>
                <ul className="list-circle pl-6 mt-1">
                  <li>200: OK - Request successful</li>
                  <li>201: Created - Resource created successfully</li>
                  <li>204: No Content - Request successful, no content to return</li>
                </ul>
              </li>
              <li><strong>3xx Redirection</strong>
                <ul className="list-circle pl-6 mt-1">
                  <li>301: Moved Permanently</li>
                  <li>302: Found (Temporary Redirect)</li>
                  <li>307: Temporary Redirect</li>
                  <li>308: Permanent Redirect</li>
                </ul>
              </li>
              <li><strong>4xx Client Errors</strong>
                <ul className="list-circle pl-6 mt-1">
                  <li>400: Bad Request</li>
                  <li>401: Unauthorized</li>
                  <li>403: Forbidden</li>
                  <li>404: Not Found</li>
                </ul>
              </li>
              <li><strong>5xx Server Errors</strong>
                <ul className="list-circle pl-6 mt-1">
                  <li>500: Internal Server Error</li>
                  <li>502: Bad Gateway</li>
                  <li>503: Service Unavailable</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 