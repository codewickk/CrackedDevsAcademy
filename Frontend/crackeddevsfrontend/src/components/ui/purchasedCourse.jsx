import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { BentoGrid } from "../ui/bento-grid";
import { PurchasedBentoGridItem } from "../ui/PurchasedBentoGridItem";
const API_URL = import.meta.env.VITE_APP_API_BACKEND;
export function PurchasedCourses() {
  const [items, setItems] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        // console.log("Token available:", !!token); 

        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }
  
        const response = await axios.get(`${API_URL}/api/v1/student/purchasedCourses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // console.log("Raw API response:", response.data); 
        // console.log("Courses to render:", response.data.purchased);
  
        if (response.data.success) {
          setItems(response.data.purchased);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        // console.error("Fetch error details:", error);
        setError(error.response?.data?.message || 'Error fetching courses');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) {
    return <div className="text-white text-center p-4">Loading your courses...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  if (items.length === 0) {
    return <div className="text-white text-center mt-4">No purchased courses found.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <BentoGrid className="gap-4">
        {items.map((course) => (
          <PurchasedBentoGridItem
            key={course.courseId}
            className="col-span-1"
            title={course.title}
            description={course.description}
            header={course.thumbnail}
            category={course.category}
            courseId={course.courseId}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
