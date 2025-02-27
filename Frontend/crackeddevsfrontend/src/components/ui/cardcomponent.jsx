import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_BACKEND;
export function BentoGridDemo() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // console.log("Fetching courses...");
        
        const response = await axios.get(`${API_URL}/api/v1/courses/getcourses`);
        
        // console.log("API Response:", response.data);
        
        if (response.data && response.data.success) {
          setItems(response.data.courses);
          // console.log("Courses loaded:", response.data.courses);
        }
      } catch (err) {
        // console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-4">Loading courses...</div>;
  }

  
  if (!items || items.length === 0) {
    return <div className="text-white text-center py-4">No courses available.</div>;
  }

  return (
    <div className="w-full">
      <BentoGrid className="max-w-4xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
           key={i}  
          _id={item._id}
            title={item.title || 'Untitled Course'}
            description={item.description || ''}
            header={item.thumbnail}
            category={item.category || 'General'}
            price={item.price || 'N/A'}
          />
        ))}
      </BentoGrid>
    </div>
  );
}