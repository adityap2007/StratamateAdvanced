import EmergencyNotification from './components/EmergencyNotification'
import OccupancyTracker from './components/OccupancyTracker'
import VisitorAccess from './components/VisitorAccess'

export default function BuildingManagementPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Building Management</h1>
      <p className="text-gray-600">
        Track occupancy, manage visitor access, and handle maintenance requests.
      </p>
      <div className="grid gap-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Occupancy Tracking</h2>
          <p className="text-gray-600">Monitor and manage building occupancy in real-time.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Visitor Access</h2>
          <p className="text-gray-600">Manage visitor permissions and access logs.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Facility Bookings</h2>
          <p className="text-gray-600">Schedule and manage common area bookings.</p>
        </div>
      </div>
    </div>
  )
} 