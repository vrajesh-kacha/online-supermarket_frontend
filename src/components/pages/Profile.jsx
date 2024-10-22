import Layout from '../pages/layouts/Layout.jsx'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/auth.jsx';



const Profile = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [auth, setAuth] = useAuth();

  const submit = async (e) => {
    e.preventDefault();

   
    if (name.trim() === '' && password.trim() === '' && phone.trim() === '') {
      toast.error('Please fill in at least one field to update your profile.');
      return;
    }

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/user/updateprofile`,
        {
          name,
          password,
          phone,
          user: auth.user,
        }
      );

      if (data.success) {
        toast.success('Profile updated successfully');
        setName('');
        setPassword('');
        setPhone('');

        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.user;
        localStorage.setItem('auth', JSON.stringify(ls));
      }
    } catch (error) {
      toast.error('Something went wrong while updating profile');
    }
  };

  return (
    <Layout title="Update Your Profile">
      <div className="container d-flex justify-content-center align-items-center vh-80">
        <div className="col-lg-4 col-md-6 col-sm-8 col-12">
          <h1 className="h3 mb-3 fw-normal text-center"><b>User Profile</b></h1>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label"><b>Username </b></label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                id="username"
                value={name}
                placeholder="Username"
                autoComplete='off'
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><b>Password </b></label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Password"
                value={password}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><b>Phone Number </b></label>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setPhone(e.target.value)}
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
    </Layout>
  );
};

export default Profile;