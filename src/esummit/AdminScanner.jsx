import React, { useEffect, useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';

const AdminScanner = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  const [formState, setFormState] = useState({});
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const scanningRef = useRef(true);
  const navigate = useNavigate();

  // Check if the logged-in user is an admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await userAPI.checkAdmin();
        
        if (response.error) {
          navigate('/esummit/login');
          return;
        }

        if (response.isAdmin) {
          setIsAdmin(true);
        } else {
          navigate('/esummit/login');
        }
      } catch (error) {
        console.error("Error checking admin:", error);
        alert("Error verifying admin status.");
        navigate('/esummit/login');
      }
      setLoading(false);
    };
    checkAdmin();
  }, [navigate]);

  // Function to get user data by UID from QR code
  const getUserData = async (uid) => {
    try {
      const response = await userAPI.getUserByQR(uid);
      
      if (response.error) {
        alert('User not found');
        scanningRef.current = true;
        return;
      }

      setScannedData({ ...response.user, uid });
      setFormState({
        id_card: response.user.id_card || false,
        wrist_band: response.user.wrist_band || false,
        delegate_kiit: response.user.delegate_kiit || false,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      alert('Failed to fetch user data');
      scanningRef.current = true;
    }
  };

  // QR scanning logic using jsQR and canvas
  const captureAndScan = useCallback(() => {
    if (
      webcamRef.current &&
      canvasRef.current &&
      webcamRef.current.video.readyState === 4 &&
      scanningRef.current
    ) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        scanningRef.current = false;
        const uid = code.data.split('/').pop();
        getUserData(uid);
      }
    }
  }, []);

  // Continuously scan every 700ms
  useEffect(() => {
    const interval = setInterval(captureAndScan, 700);
    return () => clearInterval(interval);
  }, [captureAndScan]);

  const handleCheckboxChange = (key) => {
    setFormState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Submit updated data to API
  const handleSubmit = async () => {
    try {
      if (scannedData?.uid) {
        const response = await userAPI.updateUserStatus(scannedData.uid, formState);
        
        if (response.error) {
          throw new Error(response.error);
        }

        alert('Data updated successfully.');
        setScannedData((prev) => ({ ...prev, ...formState }));
        scanningRef.current = true;
      }
    } catch (error) {
      console.error("Update error:", error);
      alert('Failed to update data');
    }
  };

  // Show loading screen
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-400"></div>
          <p className="text-white text-lg font-semibold mt-4">Loading Admin Panel...</p>
        </div>
      </div>
    );

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 px-6 py-12 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold text-white mb-12 text-center leading-tight drop-shadow-lg select-none">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
          Admin QR Scanner
        </span>{' '}
        <span role="img" aria-label="scanner" className="ml-2">🔍</span>
      </h1>

      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-600 ring-4 ring-purple-400 ring-opacity-70 hover:scale-[1.02] transform transition-transform duration-300 mb-10">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className="w-full rounded-xl"
          videoConstraints={{ facingMode: 'environment' }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-3/4 h-3/4 border-4 border-dashed border-white opacity-70 rounded-lg animate-pulse-border"></div>
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {scannedData && (
        <div className="w-full max-w-md mt-6 bg-white rounded-2xl shadow-xl p-8 scale-95 animate-fade-in transition-all duration-300 ease-in-out">
          <h2 className="text-4xl font-bold mb-3 text-gray-900 leading-tight">
            {scannedData.firstname} {scannedData.lastname}
          </h2>
          <p className="text-md text-gray-600 mb-8 tracking-wide">
            Elixir ID: <span className="font-semibold text-indigo-700">{scannedData.elixir || 'N/A'}</span>
          </p>

          <div className="space-y-6">
            {['id_card', 'wrist_band', 'delegate_kiit'].map((key) => (
              <label
                key={key}
                className="flex justify-between items-center bg-indigo-50 px-6 py-4 rounded-xl border border-indigo-200 cursor-pointer hover:bg-indigo-100 transition-all duration-200 ease-in-out transform hover:scale-[1.01]"
              >
                <span className="capitalize text-lg font-medium text-gray-800 tracking-wide">
                  {key.replace(/_/g, ' ')}
                </span>
                <input
                  type="checkbox"
                  className="form-checkbox h-7 w-7 text-indigo-600 rounded-md focus:ring-indigo-500 transition-all duration-150"
                  checked={formState[key] || false}
                  onChange={() => handleCheckboxChange(key)}
                />
              </label>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-10 w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            ✅ Update User Data
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminScanner;
