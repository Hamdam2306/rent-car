import React, { useState, useRef } from 'react';
import { Car } from 'lucide-react';

<Car size={24} color="red" />


import { 
  Camera, 
  ChevronDown, 
  Calendar, 
  DollarSign, 
  Settings,  
  Users, 
  MapPin, 
  FileText,
  Plus,
  X,

} from 'react-feather';

const AddCar = () => {
  const [formData, setFormData] = useState({
    brand: 'Volvo',
    model: 'C40 EV',
    year: '2021',
    price: '150',
    category: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Electric',
    seating: '5',
    location: 'New York',
    description: 'A luxurious SUV with a spacious interior and a powerful engine.',
    image: null as File | null
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert('File type not supported. Please upload a PNG, JPG, or JPEG image.');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB. Please choose a smaller file.');
        return;
      }
      
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a complete car object with all data
    const carListing = {
      ...formData,
      imageName: formData.image ? formData.image.name : null
    };
    
    alert('Car listing submitted successfully!');
    console.log('Car Listing:', carListing);
  };

  return (
    <div className='flex'>
        <div className="flex min-h-screen">

      <div className="flex-1 pt-0 md:p-4 overflow-auto">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Car className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Add New Car</h1>
                <p className="text-blue-100 mt-1">
                  Fill in details to list a new car for booking, including pricing, availability, and car specifications.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Image Upload */}
              <div>
                <div className="mb-8">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
                    <Camera className="text-indigo-600" size={20} /> 
                    Upload a picture of your car
                  </h2>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  {imagePreview ? (
                    <div className="relative border-2 border-indigo-300 rounded-2xl bg-indigo-50 p-4">
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative w-full">
                          <img 
                            src={imagePreview} 
                            alt="Car preview" 
                            className="w-full h-64 object-contain rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        <p className="text-indigo-700 font-medium mt-3">
                          {formData.image?.name}
                        </p>
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                        >
                          Change Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={triggerFileInput}
                      className="border-2 border-dashed border-indigo-300 rounded-2xl bg-indigo-50 p-8 text-center cursor-pointer hover:bg-indigo-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-indigo-200 p-4 rounded-full mb-3">
                          <Plus className="text-indigo-700" size={24} />
                        </div>
                        <p className="text-indigo-700 font-medium">Click to upload</p>
                        <p className="text-gray-500 text-sm mt-1">PNG, JPG or JPEG (max. 10MB)</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Description */}
                <div className="mb-8">
                  <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
                    <FileText className="text-indigo-600" size={20} /> 
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Describe your car..."
                  />
                </div>
              </div>
              
              {/* Right Column - Form Inputs */}
              <div>
                <div className="mb-8">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
                    <Settings className="text-indigo-600" size={20} /> 
                    Car Details
                  </h2>
                  
                  {/* Brand and Model */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                      <div className="relative">
                        <select 
                          name="brand" 
                          value={formData.brand}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        >
                          <option>Volvo</option>
                          <option>Tesla</option>
                          <option>BMW</option>
                          <option>Mercedes</option>
                          <option>Audi</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Car className="text-gray-400" size={18} />
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown className="text-gray-400" size={18} />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                      <div className="relative">
                        <input
                          name="model"
                          value={formData.model}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter model"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Settings className="text-gray-400" size={18} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Year, Price, Category */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                      <div className="relative">
                        <select 
                          name="year" 
                          value={formData.year}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        >
                          <option>2021</option>
                          <option>2022</option>
                          <option>2023</option>
                          <option>2024</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="text-gray-400" size={18} />
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown className="text-gray-400" size={18} />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Daily Price ($)</label>
                      <div className="relative">
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter price"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="text-gray-400" size={18} />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <div className="relative">
                        <select 
                          name="category" 
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        >
                          <option>SUV</option>
                          <option>Sedan</option>
                          <option>Coupe</option>
                          <option>Hatchback</option>
                          <option>Convertible</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Car className="text-gray-400" size={18} />
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown className="text-gray-400" size={18} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transmission, Fuel, Seating */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                      <div className="relative">
                        <select 
                          name="transmission" 
                          value={formData.transmission}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        >
                          <option>Automatic</option>
                          <option>Manual</option>
                          <option>Semi-Automatic</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Settings className="text-gray-400" size={18} />
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown className="text-gray-400" size={18} />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                      <div className="relative">
                        <select 
                          name="fuelType" 
                          value={formData.fuelType}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        >
                          <option>Electric</option>
                          <option>Petrol</option>
                          <option>Diesel</option>
                          <option>Hybrid</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <div className="text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="4" y1="22" x2="4" y2="2"></line>
                              <path d="M4 12H2c0-1.1.9-2 2-2h8a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-2"></path>
                              <path d="m18 6 4 4-4 4"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown className="text-gray-400" size={18} />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Seating Capacity</label>
                      <div className="relative">
                        <select 
                          name="seating" 
                          value={formData.seating}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        >
                          <option>2</option>
                          <option>4</option>
                          <option>5</option>
                          <option>7</option>
                          <option>8+</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Users className="text-gray-400" size={18} />
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown className="text-gray-400" size={18} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <div className="relative">
                      <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter location"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="text-gray-400" size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:-translate-y-0.5 hover:shadow-xl flex items-center gap-2"
              >
                <Plus size={18} />
                List Your Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddCar;