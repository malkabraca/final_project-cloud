// 1 * 60 * 1000


import React, { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const LogoutTimer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    let logoutTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => setIsLoggedIn(false),1 * 1 * 1000); // 4 hours in milliseconds
      <ProtectedRoute />
    };

    const clearTimer = () => {
      clearTimeout(logoutTimer);
    };

    // Add event listeners for user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    window.addEventListener("scroll", resetTimer);

    return () => {
      // Clean up event listeners when component is unmounted
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      clearTimer();
    };
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <p className="phome">You are logged in. Stay active to avoid automatic logout.</p>
      ) : (
        <p className="phome">You have been logged out due to inactivity.</p>
      )}
    </div>
  );
};

export default LogoutTimer;
