'use client';

import { useState } from 'react';

interface Document {
  id: number;
  title: string;
  category: string;
  uploadDate: string;
  size: string;
  type: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      title: 'Building Insurance Policy 2024',
      category: 'Insurance',
      uploadDate: '2024-01-15',
      size: '2.5 MB',
      type: 'PDF'
    },
    {
      id: 2,
      title: 'Fire Safety Inspection Report',
      category: 'Safety',
      uploadDate: '2024-02-20',
      size: '1.8 MB',
      type: 'PDF'
    },
    {
      id: 3,
      title: 'AGM Minutes 2023',
      category: 'Minutes',
      uploadDate: '2023-12-10',
      size: '500 KB',
      type: 'DOC'
    },
    {
      id: 4,
      title: 'Building Maintenance Schedule',
      category: 'Maintenance',
      uploadDate: '2024-03-01',
      size: '1.2 MB',
      type: 'XLSX'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Insurance', 'Safety', 'Minutes', 'Maintenance', 'Financial'];

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xlsx':
        return '📊';
      default:
        return '📎';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Building Documents</h1>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid gap-4">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <span className="text-2xl" role="img" aria-label="file icon">
                  {getFileIcon(doc.type)}
                </span>
                <div>
                  <h3 className="font-medium">{doc.title}</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Category: {doc.category}</p>
                    <p>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                    <p>Size: {doc.size}</p>
                  </div>
                </div>
              </div>
              <button
                className="text-blue-600 hover:text-blue-800 transition-colors"
                onClick={() => {/* Handle download */}}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No documents found matching your criteria
        </div>
      )}

      {/* Upload Section */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Upload New Document</h2>
        <div className="flex items-center justify-center w-full">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg shadow-lg tracking-wide border border-dashed border-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-sm">Select a file</span>
            <input type='file' className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
} 