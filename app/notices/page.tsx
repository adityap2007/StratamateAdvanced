export default function NoticesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notices & Announcements</h1>
      <p className="text-gray-600">
        Stay informed about important building updates and announcements.
      </p>
      <div className="grid gap-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Building Updates</h2>
          <p className="text-gray-600">View the latest building maintenance and improvement updates.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Community Announcements</h2>
          <p className="text-gray-600">Read important announcements from the strata committee.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Emergency Notices</h2>
          <p className="text-gray-600">Access critical information and emergency notifications.</p>
        </div>
      </div>
    </div>
  )
} 