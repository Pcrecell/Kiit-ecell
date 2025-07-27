import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authAPI, userAPI } from '../services/api';

export default function IdCard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const params = new URLSearchParams(location.search);
      const status = params.get('status');

      if (status !== 'success') {
        navigate('/esummit');
        return;
      }

      try {
        // Verify token and get user data
        const userResponse = await authAPI.verifyToken();

        
        if (userResponse.error) {
          navigate('/esummit');
          return;
        }

        const data = userResponse.user;

        if (!data.payment) {
          console.warn('Payment not verified');
          navigate('/esummit/paymentchoice');
        } else {
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/esummit');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [location, navigate]);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      navigate('/esummit');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Your E-Summit ID Card</h1>

      <div className="border rounded-xl p-6 shadow-lg bg-gray-50 w-full max-w-sm text-center">
        <h2 className="text-xl text-gray-600 font-semibold mb-2">{userData.firstname}</h2>
        <p className="text-sm text-gray-600 mb-1">{userData.email}</p>
        <p className="text-sm text-gray-700 font-medium mb-4">Elixir ID: {userData.elixir}</p>

        {/* ✅ QR Code Display Section */}
        {userData.qrCode ? (
          <img src={userData.qrCode} alt="QR Code" className="w-40 h-40 mx-auto mb-4" />
        ) : (
          <p className="text-red-500">QR code not available.</p>
        )}
        {/* 🔼 End of QR Code Display */}

        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}