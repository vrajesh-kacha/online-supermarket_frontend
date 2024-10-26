import Layout from '../layouts/Layout.jsx'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate ,Link} from 'react-router-dom';

  const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
  
    const [errors, setErrors] = useState({ username: "", email: "", password: "", phone: "" });
  
    const submit = async (e) => {
      e.preventDefault();
  
      
      setErrors({ username: "", email: "", password: "", phone: "" });
  
      let formIsValid = true;
      let usernameError = "";
      let emailError = "";
      let passwordError = "";
      let phoneError = "";
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!username.trim()) {
        usernameError = "Username is required";
        formIsValid = false;
      }
      else if (username.trim().length>5) {
        usernameError = "Username length can be maximum 5";
        formIsValid = false;
      }
  
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
  
      if (!phone.trim()) {
        phoneError = "Phone number is required";
        formIsValid = false;
      }

      setErrors({ username: usernameError, email: emailError, password: passwordError, phone: phoneError });
  
     
      if (!formIsValid) return;
  
      try {
        const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/user/register`, {
          username: username.trim(),
          email: email.trim(),
          password: password.trim(),
          phone: phone
        });
  
        if (res.data.success) {
          setTimeout(()=>navigate("/login"),2000);
          toast.success("Registration successful");
        }
      } catch (error) {
        toast.error("An error occurred");
      }
    }
  
    return (
      <Layout title="Register">
        <div className="container d-flex justify-content-center align-items-center vh-80">
          <div className="col-lg-4 col-md-6 col-sm-8 col-12">
            <h1 className="h3 mb-3 fw-normal text-center"><b>Sign Up</b></h1>
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label"><b>Username*</b></label>
                <input
                  type="text"
                  className={`form-control ${errors.username? 'is-invalid' : ''}`}
                  onChange={(e) => {setUsername(e.target.value);
                    setErrors({})
                  }}
                  id="username"
                  placeholder="Username"
                  autoComplete='off'
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label"><b>Email address*</b></label>
                <input
                  type="email novalidate/"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) =>{ setEmail(e.target.value);
                    setErrors({})
                  }}
                  id="email"
                  placeholder="Enter email"
                  autoComplete='off'

                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label"><b>Password*</b></label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  onChange={(e) => {setPassword(e.target.value);
                    setErrors({})
                  }}
                  id="password"
                  placeholder="Password"
                  autoComplete='off'

                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label"><b>Phone Number*</b></label>
                <input
                  type="number"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  onChange={(e) =>{ setPhone(e.target.value);
                    setErrors({})
                  }}
                  id="phone"
                  placeholder="Enter phone number"
                  autoComplete='off'
                 

                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
              <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
            <p> Already have an Account ?
          <Link to="/login" className="navbar-brand ms-3 ">
           Login
            </Link>
          </p>
          </div>
        </div>
      </Layout>
    );
  }
  
  export default Register;