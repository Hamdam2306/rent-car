// CarRentPage.tsx
import React, { useState } from 'react';
import { FaCar, FaPlus, FaSearch, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';

// Mashina ma'lumotlari uchun interfeys
interface Car {
  id: string;
  model: string;
  brand: string;
  year: number;
  color: string;
  price: number;
  status: 'available' | 'rented' | 'maintenance';
  category: 'economy' | 'standard' | 'premium' | 'suv';
}

const CarRentPage = () => {
  // Dastlabki mashinalar ro'yxati
  const initialCars: Car[] = [
    { id: '1', model: 'Camry', brand: 'Toyota', year: 2022, color: 'Oq', price: 70, status: 'available', category: 'standard' },
    { id: '2', model: 'Accord', brand: 'Honda', year: 2021, color: 'Qora', price: 65, status: 'rented', category: 'standard' },
    { id: '3', model: 'Model S', brand: 'Tesla', year: 2023, color: 'Kulrang', price: 150, status: 'available', category: 'premium' },
    { id: '4', model: 'X5', brand: 'BMW', year: 2022, color: 'Kumush', price: 120, status: 'maintenance', category: 'suv' },
    { id: '5', model: 'Civic', brand: 'Honda', year: 2021, color: 'Qizil', price: 55, status: 'available', category: 'economy' },
    { id: '6', model: 'C-Class', brand: 'Mercedes', year: 2023, color: 'Qora', price: 110, status: 'rented', category: 'premium' },
    { id: '7', model: 'RAV4', brand: 'Toyota', year: 2022, color: 'Koʻk', price: 80, status: 'available', category: 'suv' },
    { id: '8', model: 'Rio', brand: 'Kia', year: 2021, color: 'Oq', price: 45, status: 'available', category: 'economy' },
  ];

  // State'lar
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [filteredCars, setFilteredCars] = useState<Car[]>(initialCars);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    minPrice: '',
    maxPrice: '',
  });

  // Yangi mashina qo'shish
  const addCar = (car: Car) => {
    setCars([...cars, car]);
    setFilteredCars([...cars, car]);
    setIsAddModalOpen(false);
  };

  // Mashinani tahrirlash
  const editCar = (updatedCar: Car) => {
    setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car));
    setFilteredCars(filteredCars.map(car => car.id === updatedCar.id ? updatedCar : car));
    setIsEditModalOpen(false);
    setSelectedCar(null);
  };

  // Mashinani o'chirish
  const deleteCar = (id: string) => {
    setCars(cars.filter(car => car.id !== id));
    setFilteredCars(filteredCars.filter(car => car.id !== id));
    setIsDeleteModalOpen(false);
    setSelectedCar(null);
  };

  // Qidiruv va filtr funksiyasi
  const applyFilters = () => {
    let result = cars;
    
    // Qidiruv bo'yicha filtr
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(car => 
        car.model.toLowerCase().includes(term) || 
        car.brand.toLowerCase().includes(term) ||
        car.color.toLowerCase().includes(term)
    )}
    
    // Status bo'yicha filtr
    if (filters.status !== 'all') {
      result = result.filter(car => car.status === filters.status);
    }
    
    // Kategoriya bo'yicha filtr
    if (filters.category !== 'all') {
      result = result.filter(car => car.category === filters.category);
    }
    
    // Narx bo'yicha filtr
    if (filters.minPrice) {
      result = result.filter(car => car.price >= Number(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      result = result.filter(car => car.price <= Number(filters.maxPrice));
    }
    
    setFilteredCars(result);
  };

  // Filtrlarni qo'llash
  React.useEffect(() => {
    applyFilters();
  }, [filters, searchTerm]);

  // Status ranglari
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Kategoriya ranglari
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'economy': return 'bg-purple-100 text-purple-800';
      case 'standard': return 'bg-indigo-100 text-indigo-800';
      case 'premium': return 'bg-red-100 text-red-800';
      case 'suv': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Sarlavha va statistikalar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaCar className="mr-3 text-blue-600" /> Mashinalarni Boshqarish
            </h1>
            <p className="text-gray-600 mt-2">Barcha mashinalar ro'yxati va boshqaruv</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-0">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600">Jami mashinalar</p>
              <p className="text-2xl font-bold text-blue-600">{cars.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600">Ijaraga berilgan</p>
              <p className="text-2xl font-bold text-green-600">{cars.filter(c => c.status === 'available').length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-gray-600">Ta'mirlanmoqda</p>
              <p className="text-2xl font-bold text-yellow-600">{cars.filter(c => c.status === 'maintenance').length}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-gray-600">Ijara muddati tugagan</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </div>
          </div>
        </div>
        
        {/* Filtrlar va qidiruv */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaFilter className="mr-2 text-blue-500" /> Filtrlash va qidiruv
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qidiruv</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Model, brend, rang..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Holati</label>
              <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">Barcha holatlar</option>
                <option value="available">Mavjud</option>
                <option value="rented">Ijara olindi</option>
                <option value="maintenance">Ta'mirlanmoqda</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategoriya</label>
              <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="all">Barcha kategoriyalar</option>
                <option value="economy">Ekonom</option>
                <option value="standard">Standart</option>
                <option value="premium">Premium</option>
                <option value="suv">SUV</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Narx oralig'i ($)</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Jadval ustidagi amallar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Mashinalar ro'yxati <span className="text-blue-600">({filteredCars.length})</span>
          </h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            <FaPlus className="mr-2" /> Yangi mashina qo'shish
          </button>
        </div>
        
        {/* Mashinalar jadvali */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yili</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rang</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategoriya</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Narxi ($/kun)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holati</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCars.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{car.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{car.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{car.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: car.color.toLowerCase() }}></div>
                      {car.color}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(car.category)}`}>
                      {car.category === 'economy' ? 'Ekonom' : 
                       car.category === 'standard' ? 'Standart' : 
                       car.category === 'premium' ? 'Premium' : 'SUV'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">${car.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(car.status)}`}>
                      {car.status === 'available' ? 'Mavjud' : 
                       car.status === 'rented' ? 'Ijara olindi' : 'Taʼmirlanmoqda'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedCar(car);
                        setIsEditModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCar(car);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">Hech qanday mashina topilmadi</div>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({
                    status: 'all',
                    category: 'all',
                    minPrice: '',
                    maxPrice: '',
                  });
                }}
                className="text-blue-600 hover:underline"
              >
                Filtrlarni tozalash
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Yangi mashina qo'shish modali */}
      {isAddModalOpen && (
        <AddCarModal 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={addCar} 
          carsCount={cars.length}
        />
      )}
      
      {/* Tahrirlash modali */}
      {isEditModalOpen && selectedCar && (
        <EditCarModal 
          car={selectedCar} 
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedCar(null);
          }} 
          onSave={editCar} 
        />
      )}
      
      {/* O'chirish modali */}
      {isDeleteModalOpen && selectedCar && (
        <DeleteCarModal 
          car={selectedCar} 
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedCar(null);
          }} 
          onDelete={deleteCar} 
        />
      )}
    </div>
  );
};

// Modallar komponentlari
const AddCarModal = ({ onClose, onAdd, carsCount }: { onClose: () => void, onAdd: (car: Car) => void, carsCount: number }) => {
  const [formData, setFormData] = useState({
    model: '',
    brand: '',
    year: new Date().getFullYear(),
    color: '#ffffff',
    price: 50,
    status: 'available' as 'available' | 'rented' | 'maintenance',
    category: 'economy' as 'economy' | 'standard' | 'premium' | 'suv'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: `car-${carsCount + 1}`,
      ...formData
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaPlus className="mr-2 text-blue-600" /> Yangi mashina qo'shish
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brend</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yili</label>
                  <input
                    type="number"
                    min="2000"
                    max={new Date().getFullYear() + 1}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rang</label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      className="w-10 h-10 mr-2 border-0 rounded cursor-pointer"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                    />
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Narxi ($/kun)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategoriya</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  >
                    <option value="economy">Ekonom</option>
                    <option value="standard">Standart</option>
                    <option value="premium">Premium</option>
                    <option value="suv">SUV</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Holati</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="available">Mavjud</option>
                  <option value="rented">Ijara olindi</option>
                  <option value="maintenance">Taʼmirlanmoqda</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Mashinani qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const EditCarModal = ({ car, onClose, onSave }: { car: Car, onClose: () => void, onSave: (car: Car) => void }) => {
  const [formData, setFormData] = useState<Car>({...car});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaEdit className="mr-2 text-blue-600" /> Mashinani tahrirlash
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brend</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yili</label>
                  <input
                    type="number"
                    min="2000"
                    max={new Date().getFullYear() + 1}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rang</label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      className="w-10 h-10 mr-2 border-0 rounded cursor-pointer"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                    />
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Narxi ($/kun)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategoriya</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  >
                    <option value="economy">Ekonom</option>
                    <option value="standard">Standart</option>
                    <option value="premium">Premium</option>
                    <option value="suv">SUV</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Holati</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="available">Mavjud</option>
                  <option value="rented">Ijara olindi</option>
                  <option value="maintenance">Taʼmirlanmoqda</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                O'zgarishlarni saqlash
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const DeleteCarModal = ({ car, onClose, onDelete }: { car: Car, onClose: () => void, onDelete: (id: string) => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaTrash className="mr-2 text-red-600" /> Mashinani o'chirish
          </h2>
          
          <div className="mb-6 p-4 bg-red-50 rounded-lg">
            <p className="text-red-800">
              <span className="font-bold">{car.brand} {car.model}</span> mashinasini rostdan ham o'chirmoqchimisiz?
              Bu amalni ortga qaytarib bo'lmaydi.
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300"
            >
              Bekor qilish
            </button>
            <button
              onClick={() => onDelete(car.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              O'chirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRentPage;