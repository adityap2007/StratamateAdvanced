 'use client';

import { useState } from 'react';

interface CommitteeMember {
  role: string;
  name: string;
  email: string;
  phone: string;
  image: string;
}

export default function CommitteePage() {
  const [committeeMembers] = useState<CommitteeMember[]>([
    {
      role: 'Chairperson',
      name: 'Sarah Johnson',
      email: 'chair@stratamate.com',
      phone: '0400 000 001',
      image: '/committee/chairperson.png'
    },
    {
      role: 'Treasurer',
      name: 'Michael Chen',
      email: 'treasurer@stratamate.com',
      phone: '0400 000 002',
      image: '/committee/treasurer.png'
    },
    {
      role: 'Secretary',
      name: 'Emily Brown',
      email: 'secretary@stratamate.com',
      phone: '0400 000 003',
      image: '/committee/secretary.png'
    },
    {
      role: 'Representative 1',
      name: 'David Wilson',
      email: 'rep1@stratamate.com',
      phone: '0400 000 004',
      image: '/committee/rep1.png'
    },
    {
      role: 'Representative 2',
      name: 'Lisa Martinez',
      email: 'rep2@stratamate.com',
      phone: '0400 000 005',
      image: '/committee/rep2.png'
    },
    {
      role: 'Representative 3',
      name: 'James Taylor',
      email: 'rep3@stratamate.com',
      phone: '0400 000 006',
      image: '/committee/rep3.png'
    },
    {
      role: 'Representative 4',
      name: 'Amanda Lee',
      email: 'rep4@stratamate.com',
      phone: '0400 000 007',
      image: '/committee/rep4.png'
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Committee Members</h1>
      
      {/* Executive Members */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Executive Committee</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {committeeMembers.slice(0, 3).map((member) => (
            <div key={member.role} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.role}</h3>
                <p className="text-lg mb-2">{member.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{member.email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{member.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Representatives */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Representatives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {committeeMembers.slice(3).map((member) => (
            <div key={member.role} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-3 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.role}</h3>
                <p className="text-base mb-1">{member.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{member.email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{member.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 