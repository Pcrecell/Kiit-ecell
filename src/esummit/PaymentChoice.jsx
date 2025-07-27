import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const PaymentChoice = () => {
    const location = useLocation(); 
    const navigate = useNavigate();
    const { name, email, phone, uid } = location.state || {};
    const userData = {
      name: name,
      email: email,
      phone: phone,
      uid: uid
    };
  const handlePayment = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/initiate-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

    const data = await res.json();
    
    if (data.status === "success") {     
      window.location
        .assign(data.paymentUrl);
    }
    else {
      console.error("Payment initiation failed:", data.message);
      alert("Payment initiation failed. Please try again.");
    }

  };
  const handlePaymentLater = async (e) => {
    e.preventDefault();
    navigate("/esummit/Dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-md text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Confirm Payment</h1>
        
        {/* Product/Order Details */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-300">Event:</span>
            <span>E-Summit</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Date:</span>
            <span>August, 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Price:</span>
            <span>₹249</span>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-lg transition duration-300"
        >
          Pay Now ₹249
        </button>
        <br /> <br /> 
        <button
          onClick={handlePaymentLater}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-lg transition duration-300"
        >
          Pay Later
        </button>

        {/* Footer Info */}
        <p className="mt-4 text-xs text-center text-gray-400">
          Secure payment powered by XYZ Gateway
        </p>
      </div>
    </div>
  );
};

export default PaymentChoice;