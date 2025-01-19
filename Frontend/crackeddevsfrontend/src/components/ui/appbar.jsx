import React from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate();
  const handleLogin = ()=> {
    navigate("/signup")
  }
  const scrollToSection = (sectionId) => {
        const element = document.querySelector(sectionId);
        if(element) {
          element.scrollIntoView({behaviour:"Smooth"});
        }
  }
  return (

    <div className="w-full bg-neutral-950 dark:bg-neutral-950 shadow-lg flex justify-center">
      <nav className="flex justify-between items-center w-full max-w-screen-lg py-2 px-5 rounded-full bg-neutral-950/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <div className="appbar-logo">
          <a href="./" className="font-bold text-lg text-white dark:text-white">
            Cracked Devs Academy
          </a>
        </div>
        <div className="flex gap-6">
          <button
            onClick={()=>{
              scrollToSection('#course')
            }}
            className="font-medium text-neutral-200 hover:text-blue-500 dark:text-neutral-200 dark:hover:text-blue-400"
          >
            Course
          </button>
          <button
          onClick={()=>{
            scrollToSection('#testimonial')
          }}
            className="font-medium text-neutral-200 hover:text-blue-500 dark:text-neutral-200 dark:hover:text-blue-400"
          >
            Testimonials
          </button>
          <button
          onClick={()=>{
            scrollToSection('#faq')
          }}
            className="font-medium text-neutral-200 hover:text-blue-500 dark:text-neutral-200 dark:hover:text-blue-400"
          >
            FAQs
          </button>
        </div>
        <div className="flex items-center">
          <button
            className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Appbar;
