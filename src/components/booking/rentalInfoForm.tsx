// components/booking/booking-form/RentalInfoForm.tsx
import Input from "../common/input/input";
import Select from "../common/select/select";

export default function RentalInfoForm() {
//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-2">Rental Info</h1>
//       <p className="text-gray-600 mb-6">Please select your rental date</p>

//       <div className="space-y-8">
//         {/* Pick-Up & Drop-Off Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Pick-Up Section */}
//           <section>
//             <h2 className="text-lg font-bold mb-4">Pick - Up</h2>
            
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-medium mb-2">Locations</h3>
//                 <Select
//                   id="pickupLocation"
//                   options={[
//                     { value: "", label: "Select your city" },
//                     { value: "tashkent", label: "Tashkent" },
//                     { value: "samarkand", label: "Samarkand" },
//                     { value: "bukhara", label: "Bukhara" },
//                   ]}
//                 />
//               </div>
              
//               <div>
//                 <h3 className="font-medium mb-2">Time</h3>
//                 <Select
//                   id="pickupTime"
//                   options={[
//                     { value: "", label: "Select your time" },
//                     { value: "08:00", label: "08:00 AM" },
//                     { value: "10:00", label: "10:00 AM" },
//                     { value: "12:00", label: "12:00 PM" },
//                   ]}
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Drop-Off Section */}
//           <section>
//             <h2 className="text-lg font-bold mb-4">Drop - Off</h2>
            
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-medium mb-2">Locations</h3>
//                 <Select
//                   id="dropoffLocation"
//                   options={[
//                     { value: "", label: "Select your city" },
//                     { value: "tashkent", label: "Tashkent" },
//                     { value: "samarkand", label: "Samarkand" },
//                     { value: "bukhara", label: "Bukhara" },
//                   ]}
//                 />
//               </div>
              
//               <div>
//                 <h3 className="font-medium mb-2">Time</h3>
//                 <Select
//                   id="dropoffTime"
//                   options={[
//                     { value: "", label: "Select your time" },
//                     { value: "16:00", label: "04:00 PM" },
//                     { value: "18:00", label: "06:00 PM" },
//                     { value: "20:00", label: "08:00 PM" },
//                   ]}
//                 />
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* Date Section */}
//         <section>
//           <h2 className="text-lg font-bold mb-4">Date</h2>
//           <Input 
//             label="Select your date" 
//             id="rentalDate" 
//             type="date"
//           />
//         </section>
//       </div>
//     </div>
//   );




// components/booking/booking-form/RentalInfoForm.tsx

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Rental Info</h1>
      <p className="text-gray-600 mb-2">Please select your rental date</p>
<p className="text-gray-600 mb-6">Step 2 of 4</p>
      <div className="space-y-8">
        {/* Pick-Up Section */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center">
            {/* <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">
              ✓
            </span> */}
            Pick - Up
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Locations</h3>
              <Select
                id="pickupLocation"
                options={[
                  { value: "", label: "Select your city" },
                  { value: "tashkent", label: "Tashkent" },
                  { value: "samarkand", label: "Samarkand" },
                  { value: "bukhara", label: "Bukhara" },
                ]}
              />
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Time</h3>
              <Select
                id="pickupTime"
                options={[
                  { value: "", label: "Select your time" },
                  { value: "08:00", label: "08:00 AM" },
                  { value: "10:00", label: "10:00 AM" },
                  { value: "12:00", label: "12:00 PM" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Drop-Off Section */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center">
            {/* <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">
              ✓
            </span> */}
            Drop - Off
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Locations</h3>
              <Select
                id="dropoffLocation"
                options={[
                  { value: "", label: "Select your city" },
                  { value: "tashkent", label: "Tashkent" },
                  { value: "samarkand", label: "Samarkand" },
                  { value: "bukhara", label: "Bukhara" },
                ]}
              />
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Time</h3>
              <Select
                id="dropoffTime"
                options={[
                  { value: "", label: "Select your time" },
                  { value: "16:00", label: "04:00 PM" },
                  { value: "18:00", label: "06:00 PM" },
                  { value: "20:00", label: "08:00 PM" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Date Section */}
        <section >
          <h2 className="text-lg font-bold mb-4 flex items-center">
            {/* <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">
              ✓
            </span> */}
            Date
          </h2>
          <div className="max-w-xs">

    <Input 
           label="Select your date" 
            id="rentalDate" 
             type="date"
         />

          </div>
        </section>
      </div>
    </div>
  );
}


