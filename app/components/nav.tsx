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
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">Stratamate</span>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:ml-6 sm:space-x-8">
            {Object.entries(navItems).map(([path, name]) => (
              path === '/api/about.php' ? (
                <a
                  key={path}
                  href={getPhpAboutUrl()}
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                >
                  {name}
                </a>
              ) : (
                <Link
                  key={path}
                  href={path}
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                >
                  {name}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>

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
