import { useState, useEffect } from "react";
import * as data from "../../backend/config.json";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isAuth, setAuth] = useState(false);

  //fake auth

  setTimeout(() => {
    setUser({
      name: "Jeff",
    });
    setAuth(true);
  }, 2000);
  return { user, isLoading, isAuth };
};
export default useAuth;
