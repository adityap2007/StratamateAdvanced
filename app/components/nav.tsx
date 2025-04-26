import Link from 'next/link'

const navItems = {
  '/': 'Home',
  '/building-management': 'Building Management',
  '/maintenance': 'Maintenance',
  '/parking': 'Parking',
  '/notices': 'Notices',
  '/events': 'Events',
  '/committee': 'Committee Members',
  '/statistics': 'Statistics',
  '/form': 'Contact Form',
  '/api/contact.php': 'Contact Us (PHP)'
 }

export default function Navbar() {
  // Get the base URL for the PHP contact page
  const getPhpContactUrl = () => {
    if (typeof window !== 'undefined') {
      // In the browser, use the current origin
      return `${window.location.origin}/api/contact.php`;
    }
    // During server-side rendering, use a relative path
    return '/api/contact.php';
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Stratamate</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {Object.entries(navItems).map(([path, name]) => (
                <a
                  key={path}
                  href={path === '/api/contact.php' ? getPhpContactUrl() : path}
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
