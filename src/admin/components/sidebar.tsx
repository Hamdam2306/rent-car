import { useState, useEffect } from 'react';
import { Home, Car, CalendarDays, Inbox, Settings, HelpCircle,  LogOut, Plus, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Mobile detection
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    closeSidebar();
    // Add your logout logic here
    console.log("User logged out");
  };

  const menu = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Car, label: 'Car Rent', path: '/admin/cars' },
    { icon: Plus, label: 'Add car', path: '/admin/add-car' },
    { icon: Inbox, label: 'Inbox', path: '/admin/inbox' },
    { icon: CalendarDays, label: 'Calendar', path: '/admin/calendar' },
  ];

  const preferences = [
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
    { icon: HelpCircle, label: 'Help Center', path: '/admin/help' },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isOpen ? (
          <X size={24} className="text-gray-800" />
        ) : (
          <Menu size={24} className="text-gray-800" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`!fixed sm:relative w-64 bg-white p-4 flex flex-col justify-between h-screen z-40 transition-all duration-300 ease-in-out
          ${isOpen ? 'left-0' : '-left-64'} sm:left-0 border-r border-gray-200`}
      >
        <div className="overflow-y-auto flex-grow">
          {/* Logo */}
          <div className="mb-8 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <Car className="text-white" size={18} />
              </div>
              <span className="font-bold text-lg">CarRent Admin</span>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mb-2 uppercase">Main Menu</div>
          {menu.map((item) => (
            <Link
              to={item.path}
              key={item.label}
              onClick={closeSidebar}
              className={`flex items-center gap-3 py-3 px-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out mb-1
                ${location.pathname === item.path
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}

          <div className="mt-8 text-xs text-gray-500 mb-2 uppercase">Preferences</div>
          {preferences.map((item) => (
            <Link
              to={item.path}
              key={item.label}
              onClick={closeSidebar}
              className={`flex items-center gap-3 py-3 px-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out mb-1
                ${location.pathname === item.path
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}  
                  
        </div>

        {/* Logout Section */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div 
            className="flex items-center gap-3 py-3 px-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
              text-gray-700 hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <div className="p-1 bg-red-100 rounded-lg">
              <LogOut size={18} className="text-red-500" />
            </div>
            <span className="text-sm font-medium">Log Out</span>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center gap-3 mt-4 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;