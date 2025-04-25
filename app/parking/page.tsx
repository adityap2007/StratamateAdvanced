'use client';

import { useState } from 'react';

interface ParkingSpot {
  id: number;
  number: string;
  status: 'occupied' | 'available' | 'reserved';
  occupant?: string;
  vehicle?: string;
}

interface VisitorParking {
  id: number;
  visitorName: string;
  unit: string;
  vehicle: string;
  startTime: string;
  duration: number;
}

export default function ParkingPage() {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([
    { id: 1, number: 'A1', status: 'occupied', occupant: 'John Doe', vehicle: 'ABC123' },
    { id: 2, number: 'A2', status: 'available' },
    { id: 3, number: 'A3', status: 'reserved', occupant: 'Jane Smith' },
    { id: 4, number: 'B1', status: 'available' },
    { id: 5, number: 'B2', status: 'occupied', occupant: 'Mike Johnson', vehicle: 'XYZ789' },
  ]);

  const [visitorParking, setVisitorParking] = useState<VisitorParking[]>([]);
  const [showVisitorForm, setShowVisitorForm] = useState(false);
  const [newVisitor, setNewVisitor] = useState({
    visitorName: '',
    unit: '',
    vehicle: '',
    startTime: '',
    duration: 2
  });

  const handleVisitorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const visitor = {
      id: Date.now(),
      ...newVisitor
    };
    setVisitorParking([...visitorParking, visitor]);
    setNewVisitor({
      visitorName: '',
      unit: '',
      vehicle: '',
      startTime: '',
      duration: 2
    });
    setShowVisitorForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Parking</h1>
      <p className="text-gray-600">
        Manage parking spaces and visitor parking permits.
      </p>
      <div className="grid gap-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Resident Parking</h2>
          <p className="text-gray-600">View and manage your assigned parking spaces.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Visitor Permits</h2>
          <p className="text-gray-600">Request and manage visitor parking permits.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Parking Rules</h2>
          <p className="text-gray-600">Access building parking policies and guidelines.</p>
        </div>
      </div>
    </div>
  );
} 