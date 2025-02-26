import React, { useState } from "react";
import UserAppbar from "../components/ui/UserAppbar";
import CourseUploadPage from "./UploadCourse";

function EducatorProfilePage({theme , toggleTheme}) {
  const [yesUpload, setYesUpload] = useState(true);
  // console.log(yesUpload); // Debugging log commented out

  return (
    <div className="flex h-screen flex-col">
      <UserAppbar setYesUpload={setYesUpload} />
      {yesUpload && <CourseUploadPage theme={theme} toggleTheme={toggleTheme}/>}
    </div>
  );
}

export default EducatorProfilePage;
