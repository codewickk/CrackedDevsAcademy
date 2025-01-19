import React, { useEffect, useState } from "react";
import {BrowserRouter , Routes ,Route} from "react-router-dom"
import { SignupFormDemo } from "./pages/signupPage";
import { SigninFormDemo } from "./pages/signinPage";
import Landingpage from "./pages/LandingPage";
import EducatorProfilePage from "./pages/EducatorProfilePage";
import StudentProfilePage from "./pages/StudentProfilePage";

function App(){
  const [theme , settheme] = useState("dark");
  useEffect(()=>{
     document.documentElement.classList.remove("light" , "dark");
     document.documentElement.classList.add(theme);
  } , [theme])
  const toggleTheme = () => {
    settheme(previousTheme => previousTheme === "dark" ? "light":"dark");
  }
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landingpage/>}/>
      <Route path="/signup" element={<SignupFormDemo theme={theme} toggleTheme={toggleTheme}/>}/>
      <Route path="/signin" element= {<SigninFormDemo theme={theme} toggleTheme={toggleTheme} />}/>
      <Route path="/EducatorProfilePage" element= {<EducatorProfilePage theme={theme} toggleTheme={toggleTheme} />}/>
      <Route path="/StudentProfilePage" element={<StudentProfilePage theme={theme} toggleTheme={toggleTheme} />} />
    </Routes>
    </BrowserRouter>
  )
}
export default App


