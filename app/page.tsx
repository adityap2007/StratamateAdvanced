import Image from 'next/image'
import Link from 'next/link'
import { env } from './lib/env'

const features = [
  {
    href: '/building-management',
    title: 'Building Management',
    description: 'Track occupancy, manage visitor access, and handle maintenance requests.'
  },
  {
    href: '/maintenance',
    title: 'Maintenance',
    description: 'Submit and track maintenance requests for your property.'
  },
  {
    href: '/parking',
    title: 'Parking',
    description: 'Manage parking spaces and visitor parking permits.'
  },
  {
    href: '/documents',
    title: 'Documents',
    description: 'Access important strata documents and forms.'
  },
  {
    href: '/announcements',
    title: 'Announcements',
    description: 'Stay updated with the latest building announcements.'
  },
  {
    href: '/events',
    title: 'Events',
    description: 'View and manage community events and activities.'
  }
]

export default function Page() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <Image 
          src="/ChatGPT Image Apr 1, 2025, 08_47_24 AM.png" 
          alt="Description" 
          width={300} 
          height={300}
          priority
          className="mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold mb-4">
          Welcome to {env.building.name}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your Digital Strata Management Solution
        </p>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          {`The purpose of this Strata Management website is to streamline the administration and 
          communication within apartment buildings and residential communities. It provides essential tools for 
          managing committee members, levy payments, maintenance requests, and notices in an efficient, digital format.`}
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link 
            key={feature.href}
            href={feature.href}
            className="p-6 border rounded-lg hover:shadow-lg transition-all group"
          >
            <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-600">
              {feature.title}
            </h2>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </Link>
        ))}
      </section>

      {env.maintenanceMode && (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md">
          ⚠️ Maintenance Mode: Some features may be limited
        </div>
      )}

      <section className="text-center p-8 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p className="text-gray-600 mb-2">Email: {env.building.contactEmail}</p>
        <p className="text-gray-600">Address: {env.building.address}</p>
      </section>
    </div>
  )
}
