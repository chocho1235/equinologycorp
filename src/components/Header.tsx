import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
              Equinology
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex space-x-8">
            <Link 
              to="/blog" 
              className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contact
            </Link>
            <Link 
              to="/find-out-more" 
              className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Find Out More
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 