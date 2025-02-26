import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_APP_API_BACKEND
export const PurchaseCard = ({ isOpen, onClose, courseData }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;
  const handlePurchase = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `{API_URL}/api/v1/student/purchaseCourse`,
        {
          courseId: courseData._id,
          educatorId: courseData.educatorId, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Purchase successful:", response.data);
      onClose();
    } catch (error) {
      // console.error("Purchase failed:", error.response?.data || error.message);
      navigate('/signup')
    } finally {
      setIsLoading(false);
      navigate('/StudentProfilePage')
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 w-full max-w-4xl rounded-2xl overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white hover:text-gray-300 transition-colors bg-neutral-800 rounded-full"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/5">
            <img
              src={courseData.thumbnail}
              alt={courseData.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-3/5 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {courseData.title}
            </h2>

            <div className="space-y-4">
              <div className="bg-neutral-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Course Details
                </h3>
                <p className="text-neutral-300">{courseData.description}</p>
              </div>

              <div className="flex items-center justify-between bg-neutral-800 rounded-lg p-4">
                <span className="text-neutral-300">Category</span>
                <span className="text-white font-medium">
                  {courseData.category}
                </span>
              </div>

              <div className="flex items-center justify-between bg-neutral-800 rounded-lg p-4">
                <span className="text-neutral-300">Price</span>
                <span className="text-green-400 font-bold text-xl">
                  {courseData.price}
                </span>
              </div>

              <button
                className="w-full px-8 py-4 rounded-full bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#21e065] transition-all duration-200"
                onClick={handlePurchase}
              >
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
