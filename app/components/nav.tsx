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
  '/contact': 'Contact Us',
  '/api/about.php': 'About Us (PHP)'
 }

export default function Navbar() {
  // Get the base URL for the PHP about page
  const getPhpAboutUrl = () => {
    if (typeof window !== 'undefined') {
      // In the browser, use the current origin
      return `${window.location.origin}/api/about.php`;
    }
    // During server-side rendering, use a relative path
    return '/api/about.php';
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Navigation Box */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto nav-scrollbar nav-container">
            <div className="flex space-x-4 py-2 px-4 min-w-max">
              {Object.entries(navItems).map(([path, name]) => (
                path === '/api/about.php' ? (
                  <a
                    key={path}
                    href={getPhpAboutUrl()}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-gray-500 bg-gray-50 rounded-md whitespace-nowrap hover:bg-gray-100 transition-colors"
                  >
                    {name}
                  </a>
                ) : (
                  <Link
                    key={path}
                    href={path}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-gray-500 bg-gray-50 rounded-md whitespace-nowrap hover:bg-gray-100 transition-colors"
                  >
                    {name}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
