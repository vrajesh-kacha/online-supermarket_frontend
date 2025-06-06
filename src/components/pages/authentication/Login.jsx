import  { useState } from "react";

import '../index.css';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({ email: "", password: "" }); 

  const submit = async (e) => {
    e.preventDefault();

    setErrors({ email: "", password: "" });

    let formIsValid = true;
    let emailError = "";
    let passwordError = "";

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;


    if (!email.trim()) {
      emailError = "Email is required";
      formIsValid = false;
    }
    else if(!emailRegex.test(email.trim())){
      emailError = "Email is not valid";
      formIsValid = false;
    }

    if (!password.trim()) {
      passwordError = "Password is required";
      formIsValid = false;
    }

    setErrors({ email: emailError, password: passwordError });

    if (!formIsValid) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/user/login`, {
        email:email.trim(),
        password:password.trim()
      });

      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });

      localStorage.setItem("auth", JSON.stringify(res.data));
       navigate("/");

      }
    } catch (error) {
      toast.error("Invalid username or password");
    }
  }

  return (
  
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-80 p-0">
        <div className="col-lg-4 col-md-6 col-sm-8 col-12">
          <h1 className="h3 mb-3 fw-normal text-center"><b>Login</b></h1>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label"><b>Email address*</b></label>
              <input
                type="email novalidate/"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                onChange={(e) => {setEmail(e.target.value);
                  setErrors({})
                }}
                placeholder="Enter email"
                autoComplete="off"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label"><b>Password*</b></label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                onChange={(e) =>{ setPassword(e.target.value);
                  setErrors({})}
                }
                placeholder="Password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
         <p> Don't have an Account ?
          <Link to="/register" className="navbar-brand ms-3 ">
            Sign up
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Login;