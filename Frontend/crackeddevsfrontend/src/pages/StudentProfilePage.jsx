import React, { useState, useEffect } from "react";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "../lib/utils";
import StudentAppbar from "../components/ui/studentAppbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentProfilePage() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchName() {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/signin');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/v1/student/getname', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching name:", error.response ? error.response.data : error.message);
        
        localStorage.removeItem('token');
        navigate('/signin');
        
        setName("Guest");
        setError(error.response ? error.response.data : error.message);
      }
    }

    fetchName();
  }, [navigate]); 

  return (
    <div className="flex h-screen flex-col">
      <StudentAppbar />
      <div className="relative w-full flex-grow overflow-hidden bg-slate-900 flex flex-col items-center">
        <div className="relative w-full z-20 flex flex-col items-center pt-16">
          <h1 className={cn("md:text-4xl text-xl text-white")}>
            Welcome {name}, Let's upskill
          </h1>
          <p className="text-center mt-2 text-neutral-300">
            You are so close to being a cracked developer
          </p>
        </div>
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        {error && (
          <div className="text-red-500 mt-4 relative z-20">
            Error: {JSON.stringify(error)}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentProfilePage;

