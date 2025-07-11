// components/booking/booking-form/BillingForm.tsx

import Input from "../common/input/input";

export default function BillingForm() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Billing Info</h1>
      <p className="text-gray-600 mb-6">Step 1 of 4</p>

      <div className="space-y-8">
        {/* Name Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Name</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Your name"
              id="fullName"
              placeholder="Enter full name"
            />
            <Input
              label="Phone Number"
              id="phone"
              placeholder="Enter phone number"
              type="tel"
            />
          </div>
        </section>

        {/* Address Section */}
        <section>
          {/* <h2 className="text-xl font-semibold mb-4">Address</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Address"
              id="address"
              placeholder="Enter street address"
            />

  <Input label="Town / City" id="city" placeholder="Enter city" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
              {/* <Input label="ZIP Code" id="zip" placeholder="Enter ZIP code" /> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
