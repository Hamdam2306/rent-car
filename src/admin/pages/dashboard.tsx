import React from 'react';
import Sidebar from '../components/sidebar';


const Button = ({ children, variant = 'primary', className = '' }: { children: React.ReactNode; variant?: 'primary' | 'link'; className?: string }) => {
  const base = 'px-4 py-2 rounded text-sm';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    link: 'text-blue-600 hover:underline',
  };
  return <button className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
};

const Input = ({ ...props }) => {
  return <input {...props} className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring focus:border-blue-300" />;
};

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <div className={`bg-white rounded shadow-sm ${className}`}>{children}</div>;
};

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};



const Dashboard = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-50 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardContent>
            <div className="text-sm font-semibold mb-2">Details Rental</div>
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
            <div className="flex items-center gap-4 mb-2 flex-wrap">
              <div className="w-20 h-12 bg-gray-300 rounded" />
              <div>
                <div className="font-semibold">Nissan GT – R</div>
                <div className="text-xs text-gray-500">Sport Car</div>
              </div>
              <div className="ml-auto text-xs text-gray-500">#9761</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold text-sm">Pick - Up</div>
                <Input placeholder="Location" defaultValue="Kota Semarang" className="mt-1" />
                <div className="flex gap-2 mt-1">
                  <Input type="date" defaultValue="2022-07-20" className="flex-1" />
                  <Input type="time" defaultValue="07:00" className="flex-1" />
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm">Drop - Off</div>
                <Input placeholder="Location" defaultValue="Kota Semarang" className="mt-1" />
                <div className="flex gap-2 mt-1">
                  <Input type="date" defaultValue="2022-07-21" className="flex-1" />
                  <Input type="time" defaultValue="01:00" className="flex-1" />
                </div>
              </div>
            </div>
            <div className="mt-4 font-bold text-lg">$80.00</div>
            <div className="text-xs text-gray-500">Overall price and includes rental discount</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="font-semibold text-sm mb-2">Top 5 Car Rental</div>
            <div className="h-32 bg-gray-200 rounded mb-2"></div>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>Sport Car - 17,439</li>
              <li>Coupe - 18,197</li>
              <li>SUV - 9,478</li>
              <li>Hatchback - 12,510</li>
              <li>MPV - 14,406</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-sm">Recent Transaction</div>
              <Button variant="link" className="text-xs">View All</Button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Nissan GT – R', date: '20 July', price: '$80.00' },
                { name: 'Koenigsegg', date: '19 July', price: '$99.00' },
                { name: 'Rolls – Royce', date: '18 July', price: '$96.00' },
                { name: 'CR – V', date: '', price: '$80.00' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-14 h-10 bg-gray-200 rounded" />
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">Sport Car</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-sm">{item.price}</div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;