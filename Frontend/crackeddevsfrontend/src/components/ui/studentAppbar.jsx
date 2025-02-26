import React from "react";
import { useNavigate } from "react-router-dom";

function StudentAppbar({ setYesUpload }) {
  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate('/');
  };
  const handleLogoutButton = () =>{
    localStorage.removeItem('token');
    navigate('/signin');
  }
  const handleProfileClick = ()=>{
    navigate("/FeatureUnderConstruction")
  }
  return (
    <div className="w-full bg-neutral-950 dark:bg-neutral-950 shadow-lg flex justify-center">
      <nav className="flex justify-between items-center w-full max-w-screen-lg py-2 px-5 rounded-full bg-neutral-950/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <div className="appbar-logo">
          <a href="./" className="font-bold text-lg text-white dark:text-white">
            Cracked Devs Academy
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="px-6 py-2 bg-transparent text-white rounded-lg font-bold transform hover:bg-neutral-800/30 hover:-translate-y-1 transition duration-400"
            onClick={handleHomeButton}
          >
            Home
          </button>
          <button onClick={handleProfileClick}
            className="px-6 py-2 bg-transparent text-white rounded-lg font-bold transform hover:bg-neutral-800/30 hover:-translate-y-1 transition duration-400"
          >
            Profile
          </button>
          <button 
            className="px-6 py-2 bg-transparent text-white rounded-lg font-bold transform hover:bg-neutral-800/30 hover:-translate-y-1 transition duration-400"
            onClick={() => { setYesUpload(true); }}
          >
            Purchased Courses
          </button>
          <button onClick={handleLogoutButton}
            className="px-6 py-2 bg-transparent text-white rounded-lg font-bold transform hover:bg-neutral-800/30 hover:-translate-y-1 transition duration-400"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default StudentAppbar;