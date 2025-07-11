import React from 'react';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <div className={`bg-white rounded-xl shadow-md ${className}`}>{children}</div>;
}

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

const Dashboard = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50 ">
      <main className="flex-1 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Details Rental Card */}
        <Card className="md:col-span-2">
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Rental Details</h2>
              <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">#9761</div>
            </div>
            
            {/* Car Information */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="w-24 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">GT-R</span>
              </div>
              <div>
                <div className="font-bold text-gray-800">Nissan GT-R</div>
                <div className="text-xs text-gray-500">Sport Car</div>
              </div>
              <div className="ml-auto flex gap-2">
                <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Automatic</div>
                <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">4 Seats</div>
              </div>
            </div>
            
            {/* Rental Details - Pick Up & Drop Off */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {/* Pick-Up Section */}
              <div className="border border-blue-100 rounded-xl p-4 bg-gradient-to-br from-white to-blue-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-semibold text-gray-700">Pick-Up</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="text-xs font-medium text-gray-500">Location</div>
                      <div className="font-medium">Kota Semarang</div>
                    </div>
                  </div>                  

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Date</div>
                        <div className="font-medium">20 July 2023</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Time</div>
                        <div className="font-medium">07:00 AM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Drop-Off Section */}
              <div className="border border-red-100 rounded-xl p-4 bg-gradient-to-br from-white to-red-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-semibold text-gray-700">Drop-Off</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="text-xs font-medium text-gray-500">Location</div>
                      <div className="font-medium">Kota Semarang</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Date</div>
                        <div className="font-medium">21 July 2023</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Time</div>
                        <div className="font-medium">01:00 PM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Total Price */}
            <div className="mt-6 pt-5 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="font-bold text-2xl text-blue-600">$80.00</div>
                  <div className="text-xs text-gray-500 max-w-xs">Total price includes all taxes and rental discounts</div>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors">
                    Edit Details
                  </button>
                  <button className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg">
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>



        {/* Top 5 Car Rental Card */}
        <Card>
          <CardContent>
            <h3 className="font-bold text-gray-800 mb-4">Top 5 Car Types</h3>
            
            <div className="space-y-4">
              {[
                { type: 'Sport Car', count: 17439, color: 'bg-gradient-to-r from-blue-500 to-blue-400' },
                { type: 'Coupe', count: 18197, color: 'bg-gradient-to-r from-purple-500 to-purple-400' },
                { type: 'SUV', count: 9478, color: 'bg-gradient-to-r from-teal-500 to-teal-400' },
                { type: 'Hatchback', count: 12510, color: 'bg-gradient-to-r from-amber-500 to-amber-400' },
                { type: 'MPV', count: 14406, color: 'bg-gradient-to-r from-rose-500 to-rose-400' },
              ].map((car, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{car.type}</span>
                    <span className="font-semibold">{car.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${car.color} h-2 rounded-full`} 
                      style={{ width: `${(car.count / 20000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <div className="text-xs text-gray-500">Total Rentals: 72,430</div>
            </div>
          </CardContent>
        </Card>


        {/* <MapPage/> */}


        {/* Recent Transaction Card */}
        <Card className="md:col-span-3">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Recent Transactions</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider p-3">Vehicle</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider p-3">Type</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider p-3">Price</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider p-3">Date</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Nissan GT-R', date: '20 July', price: '$80.00', status: 'completed', statusColor: 'bg-green-100 text-green-800' },
                    { name: 'Koenigsegg', date: '19 July', price: '$199.00', status: 'completed', statusColor: 'bg-green-100 text-green-800' },
                    { name: 'Rolls-Royce', date: '18 July', price: '$296.00', status: 'pending', statusColor: 'bg-amber-100 text-amber-800' },
                    { name: 'Honda CR-V', date: '17 July', price: '$80.00', status: 'completed', statusColor: 'bg-green-100 text-green-800' },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xs">{item.name.split(' ')[0].substring(0, 2)}</span>
                          </div>
                          <div className="font-medium">{item.name}</div>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600">Sport Car</td>
                      <td className="p-3 font-medium">{item.price}</td>
                      <td className="p-3 text-gray-500">{item.date}</td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${item.statusColor}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;