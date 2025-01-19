import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import axios from "axios";

export default function CourseUploadPage({ theme, toggleTheme }) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("video", videoFile);
  formData.append("thumbnail", thumbnailFile);
  
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleVideoFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };
  const handleThumbnailFileChange = (event) => {
    setThumbnailFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const token = localStorage.getItem("token");
    
    if (!title || !price || !category || !videoFile || !thumbnailFile) {
      alert("Please fill all required fields and upload both video and thumbnail");
      return;
    }

    axios
      .post(
        "http://localhost:3000/api/v1/educator/uploadcourse",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Course Uploaded", response.data);
        alert("Course uploaded successfully!");
      })
      .catch((error) => {
        console.error(
          "Error while creating course ",
          error.response ? error.response.data : error.message
        );
        alert("Failed to upload course. Please try again.");
      });
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-neutral-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="relative w-full">
          <button
            className="absolute top-0 right-0 p-2 bg-gray-200 dark:bg-gray-700 rounded"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>

          <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 mb-4">
            Upload a New Course
          </h2>
          <p className="text-neutral-600 text-sm max-w-xl mb-8 dark:text-neutral-300">
            Share your knowledge by uploading a new course or lecture. Fill out
            the details below to create an engaging learning experience.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="mb-4">
                <label className="block mb-2 text-neutral-600 text-sm dark:text-neutral-300">
                  Course Category:
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="programming"
                      name="category"
                      value="programming"
                      className="cursor-pointer"
                      onChange={handleCategory}
                    />
                    <label
                      htmlFor="programming"
                      className="cursor-pointer text-neutral-600 text-sm dark:text-neutral-300"
                    >
                      Programming
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="design"
                      name="category"
                      value="design"
                      className="cursor-pointer"
                      onChange={handleCategory}
                    />
                    <label
                      htmlFor="design"
                      className="cursor-pointer text-neutral-600 text-sm dark:text-neutral-300"
                    >
                      Design
                    </label>
                  </div>
                </div>
              </div>

              <LabelInputContainer>
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  placeholder="Advanced React Development"
                  type="text"
                  value={title}
                  onChange={handleTitle}
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="price">Course Price ($)</Label>
                <Input
                  id="price"
                  placeholder="49.99"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={handlePrice}
                />
              </LabelInputContainer>
            </div>

            <div className="space-y-6">
              <LabelInputContainer>
                <Label htmlFor="description">Course Description</Label>
                <textarea
                  id="description"
                  placeholder="Comprehensive course covering advanced React concepts..."
                  className="w-full p-2 border rounded text-neutral-600 dark:bg-zinc-800 dark:text-neutral-300 min-h-[150px]"
                  rows="4"
                  value={description}
                  onChange={handleDescription}
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="video">Course Intro Video (MP4)</Label>
                <Input
                  id="video"
                  type="file"
                  accept=".mp4"
                  className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  onChange={handleVideoFileChange}
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="thumbnail">Course Thumbnail (JPEG/PNG)</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="file:mr-4 file:rounded-full file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  onChange={handleThumbnailFileChange}
                />
              </LabelInputContainer>
            </div>
          </div>

          <div className="mt-8">
            <button
              className={`
                bg-gradient-to-br relative group/btn 
                from-black dark:from-zinc-900 dark:to-zinc-900 
                to-neutral-600 block dark:bg-zinc-800 
                w-full text-white rounded-md h-12 
                font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
                dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]
              `}
              onClick={handleUpload}
            >
              Upload Course &rarr;
              <BottomGradient />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

