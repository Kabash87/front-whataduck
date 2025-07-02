import { useState, useEffect } from "react";

export const useUserAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("user-name");

    setIsLoggedIn(!!username);
  }, []);

  return isLoggedIn;
};
