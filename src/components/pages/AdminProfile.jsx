import Layout from './layouts/Layout.jsx';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/auth.jsx';
import AdminMenu from './layouts/AdminMenu.jsx';

const AdminProfile = () => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [auth, setAuth] = useAuth();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name && !password && !phone) {
      newErrors.general = "At least one field must be filled";
    }
    return newErrors;
  };

  const submit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/user/updateprofile`,
        {
          name:name.trim(),
          password: password.trim(),
          phone:phone,
          user: auth.user,
        }
      );
      if (data.success) {
        toast.success("Profile updated successfully");
        setname("");
        setpassword("");
        setphone("");
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.user;
        localStorage.setItem("auth", JSON.stringify(ls));
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating profile");
    }
  };

  return (
    <Layout title="Update Your Profile">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 d-flex justify-content-center align-items-center">
            <div className="w-50">
              <h1>Profile</h1>
              <form onSubmit={submit}>
                {errors.general && (
                  <div className="text-danger mb-3">{errors.general}</div>
                )}
                <div className="mb-3">
                  <label className="form-label"><b>Username</b></label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    id="username"
                    value={name}
                    placeholder="Username"
                    autoComplete='off'
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label"><b>Password</b></label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    id="password"
                    placeholder="Password"
                    value={password}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label"><b>Phone Number</b></label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      setphone(e.target.value);
                      setErrors({ ...errors, phone: "", general: "" });
                    }}
                    id="phone"
                    placeholder="Enter phone number"
                    value={phone}
                    autoComplete='off'
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
