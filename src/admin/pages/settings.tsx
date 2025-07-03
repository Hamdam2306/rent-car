// SettingsPage.tsx
import React, { useState } from 'react';
import { 
  FaUser, 
  FaLock,
  FaBell, 
  FaPalette, 
  FaDatabase, 
  FaShieldAlt,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaSignOutAlt,
  FaTrash,
  FaInfoCircle
} from 'react-icons/fa';


const SettingsPage = () => {
  // Sozlamalar holatlari
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+998901234567',
    position: 'Bosh Admin',
    avatar: null as File | null,
  });
  
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: true,
    showPassword: false,
  });
  
  const [preferences, setPreferences] = useState({
    language: 'uz',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sound: false,
    },
    timezone: 'Asia/Tashkent',
  });
  
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Asosiy API', key: 'sk_live_1234567890abcdef', created: '2025-01-15' },
    { id: '2', name: 'Test API', key: 'sk_test_abcdef1234567890', created: '2025-03-22' },
  ]);
  
  const [newApiKey, setNewApiKey] = useState({ name: '', key: '' });
  const [showKey, setShowKey] = useState(false);

  // Sozlamalarni yangilash
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityData({ ...securityData, [name]: value });
  };
  
  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('notifications.')) {
      const notifField = name.split('.')[1];
      setPreferences({
        ...preferences,
        notifications: {
          ...preferences.notifications,
          [notifField]: (e.target as HTMLInputElement).checked
        }
      });
    } else {
      setPreferences({ ...preferences, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value });
    }
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserData({ ...userData, avatar: e.target.files[0] });
    }
  };
  
  const togglePasswordVisibility = () => {
    setSecurityData({ ...securityData, showPassword: !securityData.showPassword });
  };
  
  const addApiKey = () => {
    if (newApiKey.name && newApiKey.key) {
      setApiKeys([...apiKeys, {
        id: `key-${Date.now()}`,
        name: newApiKey.name,
        key: newApiKey.key,
        created: new Date().toISOString().split('T')[0]
      }]);
      setNewApiKey({ name: '', key: '' });
    }
  };
  
  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };
  
  const saveSettings = () => {
    alert('Sozlamalar muvaffaqiyatli saqlandi!');
    // Bu yerda aslida serverga sozlamalarni yuborish bo'ladi
  };
  
  // Profil rasmini ko'rsatish
  const renderAvatar = () => {
    if (userData.avatar) {
      return URL.createObjectURL(userData.avatar);
    }
    return "https://ui-avatars.com/api/?name=" + encodeURIComponent(userData.name) + "&background=4f46e5&color=fff";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Yon menyu */}
        <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6 h-fit">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Sozlamalar</h1>
          
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center w-full p-3 rounded-lg text-left transition ${
                activeTab === 'profile' 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaUser className="mr-3" /> Profil Sozlamalari
            </button>
            
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center w-full p-3 rounded-lg text-left transition ${
                activeTab === 'security' 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaLock className="mr-3" /> Xavfsizlik
            </button>
            
            <button
              onClick={() => setActiveTab('preferences')}
              className={`flex items-center w-full p-3 rounded-lg text-left transition ${
                activeTab === 'preferences' 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaPalette className="mr-3" /> Shaxsiylashtirish
            </button>
            
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center w-full p-3 rounded-lg text-left transition ${
                activeTab === 'notifications' 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaBell className="mr-3" /> Bildirishnomalar
            </button>
            
            <button
              onClick={() => setActiveTab('api')}
              className={`flex items-center w-full p-3 rounded-lg text-left transition ${
                activeTab === 'api' 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaDatabase className="mr-3" /> API Kalitlar
            </button>
            
            <button
              onClick={() => setActiveTab('advanced')}
              className={`flex items-center w-full p-3 rounded-lg text-left transition ${
                activeTab === 'advanced' 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaShieldAlt className="mr-3" /> Qo'shimcha Sozlamalar
            </button>
          </nav>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={saveSettings}
              className="flex items-center justify-center w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <FaSave className="mr-2" /> Sozlamalarni Saqlash
            </button>
            
            <button className="flex items-center justify-center w-full py-3 px-4 mt-4 text-red-600 rounded-lg border border-red-200 hover:bg-red-50 transition duration-300">
              <FaSignOutAlt className="mr-2" /> Tizimdan Chiqish
            </button>
          </div>
        </div>
        
        {/* Asosiy kontent */}
        <div className="w-full lg:w-3/4 bg-white rounded-xl shadow-lg p-6">
          {/* Profil Sozlamalari */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaUser className="mr-3 text-blue-600" /> Profil Sozlamalari
              </h2>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="mb-4">
                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img 
                        src={renderAvatar()} 
                        alt="Profil rasmi" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <label className="block mb-3">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Profil rasmini o'zgartirish</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </label>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-2">Profil haqida</h3>
                    <p className="text-sm text-blue-700">
                      Siz bu yerda o'zingizning shaxsiy ma'lumotlaringizni yangilashingiz mumkin. 
                      Profil rasmingiz barcha tizim foydalanuvchilari uchun ko'rinadi.
                    </p>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To'liq Ism</label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleUserChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Manzil</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleUserChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon Raqam</label>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleUserChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lavozim</label>
                      <input
                        type="text"
                        name="position"
                        value={userData.position}
                        onChange={handleUserChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Qo'shimcha Ma'lumotlar</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          rows={3}
                          placeholder="O'zingiz haqingizda qisqacha..."
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ijtimoiy Tarmoqlar</label>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Twitter username"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="LinkedIn profili"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Xavfsizlik */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaLock className="mr-3 text-blue-600" /> Xavfsizlik Sozlamalari
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Parolni Yangilash</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Joriy Parol</label>
                        <div className="relative">
                          <input
                            type={securityData.showPassword ? "text" : "password"}
                            name="currentPassword"
                            value={securityData.currentPassword}
                            onChange={handleSecurityChange}
                            className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button 
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                          >
                            {securityData.showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Yangi Parol</label>
                        <div className="relative">
                          <input
                            type={securityData.showPassword ? "text" : "password"}
                            name="newPassword"
                            value={securityData.newPassword}
                            onChange={handleSecurityChange}
                            className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Yangi Parolni Tasdiqlash</label>
                        <div className="relative">
                          <input
                            type={securityData.showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={securityData.confirmPassword}
                            onChange={handleSecurityChange}
                            className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                        Parolni Yangilash
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Kirish Tarixi</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Toshkent, Uzbekistan</div>
                          <div className="text-sm text-gray-500">Chrome, Windows 10</div>
                        </div>
                        <div className="text-sm text-gray-500">Bugun, 14:32</div>
                      </div>
                      
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">London, UK</div>
                          <div className="text-sm text-gray-500">Safari, macOS</div>
                        </div>
                        <div className="text-sm text-gray-500">3 kun oldin, 09:15</div>
                      </div>
                      
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">New York, USA</div>
                          <div className="text-sm text-gray-500">Firefox, Windows 11</div>
                        </div>
                        <div className="text-sm text-gray-500">1 hafta oldin, 22:45</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Ikki Qadamli Autentifikatsiya</h3>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">SMS orqali tasdiqlash</div>
                        <div className="text-sm text-gray-500">+99890•••••67 raqamingizga kod yuboriladi</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={securityData.twoFactor}
                          onChange={(e) => setSecurityData({...securityData, twoFactor: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Xavfsizlik maslahatlari</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Parol kamida 8 belgidan iborat bo'lsin</li>
                        <li>• Har doim ikki qadamli autentifikatsiyani yoqing</li>
                        <li>• Noma'lum manbalardan kelgan havolalarga bosmang</li>
                        <li>• Parolingizni hech kimga bermang</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Faol Sessiyalar</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Windows 10 - Chrome</div>
                          <div className="text-sm text-gray-500">Toshkent, Uzbekistan</div>
                        </div>
                        <button className="text-sm text-red-600 hover:text-red-800">
                          Sessiyani tugatish
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Android - Firefox</div>
                          <div className="text-sm text-gray-500">Samarqand, Uzbekistan</div>
                        </div>
                        <button className="text-sm text-red-600 hover:text-red-800">
                          Sessiyani tugatish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Shaxsiylashtirish */}
          {activeTab === 'preferences' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaPalette className="mr-3 text-blue-600" /> Shaxsiylashtirish
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Til Sozlamalari</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Asosiy Til</label>
                        <select
                          name="language"
                          value={preferences.language}
                          onChange={handlePreferenceChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="uz">O'zbekcha</option>
                          <option value="ru">Русский</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vaqt Zonasi</label>
                        <select
                          name="timezone"
                          value={preferences.timezone}
                          onChange={handlePreferenceChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Asia/Tashkent">(GMT+5) Toshkent</option>
                          <option value="Europe/Moscow">(GMT+3) Moskva</option>
                          <option value="America/New_York">(GMT-5) New York</option>
                          <option value="Europe/London">(GMT+1) London</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Dizayn Sozlamalari</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mavzu</label>
                        <div className="flex space-x-4">
                          <button
                            onClick={() => setPreferences({...preferences, theme: 'light'})}
                            className={`p-3 border rounded-lg ${
                              preferences.theme === 'light' 
                                ? 'border-blue-500 ring-2 ring-blue-200' 
                                : 'border-gray-300'
                            }`}
                          >
                            <div className="w-32 h-20 bg-white border rounded"></div>
                            <div className="mt-2 font-medium">Yorug' Mavzu</div>
                          </button>
                          
                          <button
                            onClick={() => setPreferences({...preferences, theme: 'dark'})}
                            className={`p-3 border rounded-lg ${
                              preferences.theme === 'dark' 
                                ? 'border-blue-500 ring-2 ring-blue-200' 
                                : 'border-gray-300'
                            }`}
                          >
                            <div className="w-32 h-20 bg-gray-800 border border-gray-700 rounded"></div>
                            <div className="mt-2 font-medium">Qorong'i Mavzu</div>
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Asosiy Rang</label>
                        <div className="flex space-x-2">
                          {['blue', 'green', 'purple', 'red', 'orange'].map(color => (
                            <button
                              key={color}
                              className={`w-10 h-10 rounded-full bg-${color}-500`}
                              onClick={() => console.log(`Selected ${color} theme`)}
                            ></button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Interfeys Sozlamalari</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Komponent Animatsiyalari</div>
                          <div className="text-sm text-gray-500">Interfeys elementlarining animatsiyalari</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Kontent zichligi</div>
                          <div className="text-sm text-gray-500">Matn va elementlar orasidagi masofa</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Qisqartirilgan Menyu</div>
                          <div className="text-sm text-gray-500">Yon menyuni qisqartirilgan holatda ko'rsatish</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Ma'lumot Eksporti</h3>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-blue-700 mb-4">
                        Siz o'zingizning shaxsiy ma'lumotlaringizni va sozlamalaringizni JSON formatida yuklab olishingiz mumkin.
                      </p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                        Ma'lumotlarni Yuklab Olish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Bildirishnomalar */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaBell className="mr-3 text-blue-600" /> Bildirishnoma Sozlamalari
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Bildirishnoma Turlari</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Email Bildirishnomalar</div>
                        <div className="text-sm text-gray-500">Muhim hodisalar haqida email orqali xabar berish</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="notifications.email"
                          checked={preferences.notifications.email}
                          onChange={handlePreferenceChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Push Bildirishnomalar</div>
                        <div className="text-sm text-gray-500">Brauzer orqali real vaqtda bildirishnomalar</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="notifications.push"
                          checked={preferences.notifications.push}
                          onChange={handlePreferenceChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Ovozli Bildirishnomalar</div>
                        <div className="text-sm text-gray-500">Muhim hodisalarda ovozli signal</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="notifications.sound"
                          checked={preferences.notifications.sound}
                          onChange={handlePreferenceChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Bildirishnomalar Sozlamalari</h3>
                  
                  <div className="p-4 bg-gray-50 rounded-lg mb-6">
                    <h4 className="font-medium text-gray-800 mb-3">Tizim Hodisalari</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Yangilanishlar haqida bildirishnoma</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Xavfsizlik ogohlantirishlari</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Tizimdagi nosozliklar</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-3">Foydalanuvchi Faolligi</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Yangi foydalanuvchi ro'yxatdan o'tganda</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Mijoz bilan yangi suhbat boshlandida</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Buyurtma holati o'zgarganda</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* API Kalitlar */}
          {activeTab === 'api' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaDatabase className="mr-3 text-blue-600" /> API Kalitlarini Boshqarish
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Mavjud API Kalitlar</h3>
                  
                  <div className="space-y-4 mb-8">
                    {apiKeys.map(apiKey => (
                      <div key={apiKey.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">{apiKey.name}</div>
                            <div className="text-sm text-gray-500">Yaratilgan: {apiKey.created}</div>
                          </div>
                          <button 
                            onClick={() => deleteApiKey(apiKey.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        
                        <div className="mt-3">
                          <div className="text-sm text-gray-700 mb-1">API Kalit</div>
                          <div className="flex items-center">
                            <input
                              type={showKey ? "text" : "password"}
                              value={apiKey.key}
                              readOnly
                              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-l-lg"
                            />
                            <button
                              onClick={() => setShowKey(!showKey)}
                              className="px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-300"
                            >
                              {showKey ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">API Kalitlar Xavfsizligi</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• API kalitlaringizni hech kimga bermang</li>
                      <li>• Foydalanilmagan kalitlarni o'chirib tashlang</li>
                      <li>• Kalitlarni muntazam yangilang</li>
                      <li>• Faqat ishonchli manbalarga kalitlaringizni ulang</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Yangi API Kalit Qo'shish</h3>
                  
                  <div className="p-5 bg-gray-50 rounded-lg">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kalit Nomi</label>
                      <input
                        type="text"
                        placeholder="Masalan: Mobil Ilova API"
                        value={newApiKey.name}
                        onChange={(e) => setNewApiKey({...newApiKey, name: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">API Kalit</label>
                      <div className="flex items-center">
                        <input
                          type={showKey ? "text" : "password"}
                          placeholder="sk_live_... yoki sk_test_..."
                          value={newApiKey.key}
                          onChange={(e) => setNewApiKey({...newApiKey, key: e.target.value})}
                          className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => setShowKey(!showKey)}
                          className="px-4 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-300"
                        >
                          {showKey ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ruxsatlar</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                          <span className="ml-2 text-gray-700">O'qish ruxsati (read)</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                          <span className="ml-2 text-gray-700">Yozish ruxsati (write)</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                          <span className="ml-2 text-gray-700">O'chirish ruxsati (delete)</span>
                        </label>
                      </div>
                    </div>
                    
                    <button
                      onClick={addApiKey}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      API Kalitni Qo'shish
                    </button>
                  </div>
                  
                  <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-start">
                      <FaInfoCircle className="text-yellow-500 text-xl mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-1">Diqqat!</h4>
                        <p className="text-sm text-yellow-700">
                          Yangi API kalit qo'shishdan oldin, uning haqiqiy ehtiyoj uchun qo'shilayotganligiga ishonch hosil qiling.
                          Har qanday yangi kalit potentsial xavfsizlik tahdidini oshiradi.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Qo'shimcha Sozlamalar */}
          {activeTab === 'advanced' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaShieldAlt className="mr-3 text-blue-600" /> Qo'shimcha Sozlamalar
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Ma'lumotlar Boshqaruvi</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Ma'lumotlar Bazasini Optimallashtirish</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Ma'lumotlar bazasini optimallashtirish orqali tizim tezligini oshirishingiz mumkin.
                      </p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                        Optimallashtirishni Boshlash
                      </button>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Keshni Tozalash</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Tizim keshlarini tozalash yangilanma ma'lumotlarni ko'rishga yordam beradi.
                      </p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                        Keshni Tozalash
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">Tizimni Tiklash</h4>
                    <p className="text-sm text-red-700 mb-4">
                      Ushbu amal barcha sozlamalarni dastlabki holatiga qaytaradi va barcha ma'lumotlarni o'chirib tashlaydi.
                      Ehtiyot bo'ling!
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">
                      Tizimni Tiklash
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Xavfsizlik Sozlamalari</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">IP Cheklash</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Faqat ruxsat etilgan IP manzillardan kirishga ruxsat bering.
                      </p>
                      <div className="space-y-2">
                        <div className="flex">
                          <input
                            type="text"
                            placeholder="Masalan: 192.168.1.1"
                            className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                            Qo'shish
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">
                          Joriy IP: 192.168.1.105
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Faollik Jurnali</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Tizimdagi barcha harakatlarni kuzatish uchun jurnallarni yoqing.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Audit Jurnali</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Avtomatik Chiqish</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Faolliksiz qolgan vaqtdan so'ng avtomatik ravishda tizimdan chiqish.
                      </p>
                      <select
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="5">5 daqiqa</option>
                        <option value="15">15 daqiqa</option>
                        <option value="30">30 daqiqa</option>
                        <option value="60">1 soat</option>
                        <option value="0" selected>O'chirilgan</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;