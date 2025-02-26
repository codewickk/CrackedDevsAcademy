import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from 'react-player';
const API_URL = import.meta.env.VITE_APP_API_BACKEND;
const cn = (...classes) => classes.filter(Boolean).join(" ");
export const PurchasedBentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  price,
  category,
  courseId
}) => {
  const [selectedCourseId,setSelectedCourseId] = useState(courseId);
  useEffect(()=>{
    setSelectedCourseId(courseId)
  }, [courseId]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

   const handleWatchButton = async ()=>{
    try{
      setLoading(true);
      setError(null);
      // console.log(selectedCourseId);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/v1/student/isCoursePurchased`, {
        params: { courseId: selectedCourseId },  // Correct way to pass query params
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if(response.data.success){
        setVideoUrl(response.data.videoUrl);
        setShowPlayer(true);
      }
      else{
        setError(response.data.message);
      }
      // console.log(response.data);
    }
    catch(error){
      setError(error.response?.data?.message || "failed to access video")
    }
    finally{
      setLoading(false);
    }
   }
   return (
    <div className="row-span-1 rounded-xl group/bento transition duration-200 bg-black border border-neutral-800 hover:border-neutral-700 h-64 w-64 flex flex-col">
      {header && (
        <div className="h-32 overflow-hidden rounded-t-xl">
          <img
            src={header}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
              console.log("Image failed to load:", header);
            }}
          />
        </div>
      )}

      <div className="flex flex-col p-4 h-full">
        <div className="flex-grow overflow-hidden">
          {icon && <div className="text-neutral-500">{icon}</div>}
          <div className="font-sans font-bold text-neutral-200 mb-2 mt-2 truncate">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-400 text-xs line-clamp-2">
            {description}
          </div>
          <div className="font-sans font-medium text-neutral-300 mt-2 text-xs truncate">
            Category: <span className="text-neutral-400">{category}</span>
          </div>
        </div>
        <div className="mt-2">
          <button 
            onClick={handleWatchButton}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-neutral-700 text-sm font-medium text-white hover:bg-neutral-600 transition-all duration-200"
          >
            {loading ? "Loading..." : "Watch"}
          </button>
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
      </div>
      
      {showPlayer && videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setShowPlayer(false)} 
              className="absolute top-0 right-0 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full -mt-4 -mr-4"
            >
              ✕
            </button>
            <div className="w-full aspect-video">
              <ReactPlayer
                url={videoUrl}
                controls
                width="100%"
                height="100%"
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                      onContextMenu: e => e.preventDefault()
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};