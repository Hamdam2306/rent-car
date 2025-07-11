// components/booking/booking-form/PaymentForm.tsx

import Button from "../../admin/components/button";
import Input from "../common/input/input";

export default function PaymentForm() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Payment Method</h1>
      <p className="text-gray-600 mb-2">Please enter your payment method</p>
      <p className="text-gray-600 mb-6">Step 3 of 4</p>

      {/* Payment Methods */}
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['Credit Card'].map(method => (
            <div 
              key={method}
              className="border rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">{method}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Card Form */}
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input 
            label="Card Number" 
            id="cardNumber" 
            placeholder="1234 5678 9012 3456" 
          />
          <Input 
            label="Expiration Date" 
            id="expDate" 
            placeholder="DD / MM / YY" 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Card Holder" 
            id="cardHolder" 
            placeholder="Full name" 
          />
          <Input 
            label="CVC" 
            id="cvc" 
            placeholder="123" 
            type="password" 
          />
        </div>
      </div>

      {/* Checkboxes */}
       <h1 className="text-2xl font-bold mb-2">Confirmation</h1>
       <p className="text-gray-600 mb-2">We are getting to the end. Just few clicks and your rental is ready!</p>
      <p className="text-gray-600 mb-6">Step 4 of 4</p>
      <div className="space-y-4 mb-8">
        <div className="flex items-start">
          <input 
            type="checkbox" 
            id="marketing" 
            className="mt-1 mr-3" 
          />
          <label htmlFor="marketing" >
            I agree with sending an Marketing and newsletter emails. No spam, promised!
          </label>
        </div>
        
        <div className="flex items-start">
          <input 
            type="checkbox" 
            id="terms" 
            className="mt-1 mr-3" 
          />
          <label htmlFor="terms">
            I agree with our terms and conditions and privacy policy.
          </label>
        </div>
      </div>

      <Button variant="primary" className="w-25 py-3">
        Rent Now
      </Button>

<div className="mt-10">
    <h5 className=""> All your data are safe.</h5>
      <p className=" text-gray-500 text-sm">
        We are using the most advanced security to provide you the best experience ever.
      </p>
</div>
    </div>
  );
}