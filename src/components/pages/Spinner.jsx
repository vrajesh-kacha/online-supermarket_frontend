import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
const Spinner = ({ok}) => {
  const [count, setCount] = useState(5);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&  navigate(ok ?`/dashboard/${auth.user.role}` : "/login");
      return () => clearInterval(interval);
  
  }, [count, navigate])
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
       {<h1>Loading...</h1>}
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;