import { Home, Car, CalendarDays, Inbox, Settings, HelpCircle, Moon, LogOut, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';



const Sidebar = () => {
    const menu = [
      { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
      { icon: Car, label: 'Car Rent', path: '/admin/cars' },
      { icon: Plus, label: 'Add car', path: '/admin/add-car' },
      { icon: Inbox, label: 'Inbox', path: '/admin/inbox' },
      { icon: CalendarDays, label: 'Calender', path: '/admin/calendar' },
    ];
  
    const preferences = [
      { icon: Settings, label: 'Settings' },
      { icon: HelpCircle, label: 'Help & Center' },
      { icon: Moon, label: 'Dark Mode' },
    ];
  
    return (
      <aside className="w-full sm:w-64 bg-white p-4 border-r flex flex-col justify-between h-full">
        <div>
          <div className="text-xs text-gray-500 mb-2 uppercase">Main Menu</div>
          {menu.map((item) => (
            <Link
            to={item.path}
            key={item.label}
            className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-100 
              ${location.pathname === item.path ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
          >
            <item.icon size={18} />
            <span className="text-sm">{item.label}</span>
          </Link>
          ))}
          <div className="mt-6 text-xs text-gray-500 mb-2 uppercase">Preferences</div>
          {preferences.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-100 text-gray-700"
            >
              <item.icon size={18} />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-100 text-gray-700">
          <LogOut size={18} />
          <span className="text-sm">Log Out</span>
        </div>
      </aside>
    );
  };

export default Sidebar