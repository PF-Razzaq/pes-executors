import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const useInactivity = (timeout = 30 * 60 * 1000) => {
  const [labels, setLabels] = useState(false);
  const timeoutRef = useRef(null);
  const lastActivityTimeRef = useRef(Date.now());
  const location = useLocation();
  console.log("🚀 ~ useInactivity ~ location:", location.pathname)
  // Update the local storage with the latest activity time
  const updateLastActivityInStorage = () => {
    localStorage.setItem("lastActivityTime", Date.now());
  };

  const handleInactivity = () => {
    const timeElapsed = Date.now() - lastActivityTimeRef.current;
    localStorage.removeItem("userData");
    localStorage.removeItem("jwt");
    resetTimeout();
    console.log(`Inactivity detected after ${timeElapsed / 1000} seconds`);
    if (location.pathname !== "/login" && location.pathname !== "/") {
      alert(
        "For security reasons, your session has been terminated due to inactivity. Please log in again."
      );
    }
    
    

    setLabels(!labels);
    setTimeout(() => {
      window.location = "/login";
    }, 2000);
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(handleInactivity, timeout);
    lastActivityTimeRef.current = Date.now(); // Reset last activity time

    // Update the last activity time in local storage for other tabs
    updateLastActivityInStorage();
  };

  const handleActivity = () => {
    console.log("Activity detected, resetting timeout");
    resetTimeout();
  };

  useEffect(() => {
    resetTimeout();

    const events = ["mousemove", "mousedown", "keypress", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    // Listen for localStorage changes to detect activity in other tabs
    const handleStorageChange = (event) => {
      if (event.key === "lastActivityTime") {
        const lastActivity = parseInt(localStorage.getItem("lastActivityTime"), 10);
        const timeSinceLastActivity = Date.now() - lastActivity;

        // If the last activity was within the timeout, reset the timer in this tab
        if (timeSinceLastActivity < timeout) {
          resetTimeout();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      window.removeEventListener("storage", handleStorageChange);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeout]);

  return null;
};

export default useInactivity;
