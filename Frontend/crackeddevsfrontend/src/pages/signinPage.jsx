import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SigninFormDemo({ theme, toggleTheme }) {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_APP_API_BACKEND;
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const navigate = useNavigate();
  const handleHomeButton = () => {
    navigate("/");
  };

  const handleSignIn = async () => {
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    const endpoint =
      role === "student"
        ? `${API_URL}/api/v1/student/signin`
        : `${API_URL}/api/v1/educator/signin`;

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(endpoint, loginData);
      const token = response.data.token;

      localStorage.setItem("token", token);

      navigate(
        role === "student" ? "/StudentProfilePage" : "/EducatorProfilePage"
      );
    } catch (error) {
      console.error(
        "Login error",
        // error.response ? error.response.data : error.message
      );

      setError(
        error.response?.data?.msg ||
          "An error occurred during sign-in. Please try again."
      );
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded"
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Crackeddevsacademy
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign in to your account
      </p>

      {error && <div className="text-red-500 mt-4 text-sm">{error}</div>}

      <form className="my-8" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            I am a:
          </label>
          <div className="flex space-x-4 pt-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={handleRoleChange}
                className="cursor-pointer "
              />
              <label
                htmlFor="student"
                className="cursor-pointer text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Student
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="educator"
                name="role"
                value="educator"
                checked={role === "educator"}
                onChange={handleRoleChange}
                className="cursor-pointer"
              />
              <label
                htmlFor="educator"
                className="cursor-pointer text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Educator
              </label>
            </div>
          </div>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="button"
          onClick={handleSignIn}
        >
          Sign in &rarr;
          <BottomGradient />
        </button>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {" "}
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Home
          </a>
        </p>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
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
