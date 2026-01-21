import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">
              EnvVault
            </h1>
            
            <div className="flex space-x-4">
              <Link
                to="/encrypt"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/encrypt'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                Encrypt
              </Link>
              
              <Link
                to="/decrypt"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/decrypt'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                Decrypt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}