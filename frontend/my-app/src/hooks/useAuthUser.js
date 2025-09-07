// src/hooks/useAuthUser.jsx
import { useState, useEffect } from "react";
import { axios_api } from "../lib/axios"; 

const useAuthUser = () => {
  const [authUser, setAuthUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchAuthUser = async () => {
      setIsLoading(true);
      try {
        const res = await axios_api.get("/auth/me", { withCredentials: true });
        setAuthUser(res.data.user || null); // حفظ بيانات المستخدم
      } catch (err) {
        setAuthUser(null); 
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return { authUser, isLoading, error };
};

export default useAuthUser;
