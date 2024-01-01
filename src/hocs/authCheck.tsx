import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const authCheck = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const authToken = Cookies.get("bearerToken");
      if (!authToken) {
        navigate("/login");
      } else {
        setIsLoading(false);
      }
    }, [navigate]);
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default authCheck;
