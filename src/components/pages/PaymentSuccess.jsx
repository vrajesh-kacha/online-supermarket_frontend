import React, { useEffect } from 'react';
import successImage from './image.png'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const PaymentSuccess = () => {

  const [auth, setAuth]=useAuth();
  const updateCart=async()=>{
    try{
     await axios.put(
      `${import.meta.env.VITE_API}/api/v1/user/deletecart`,
      {
       email:auth?.user.email
      },
      {
        headers: {
          Authorization: auth?.token,
        },
      }
      
    );
  }
  catch(error){
    toast.error("something went wrong in payment")
  }
  }
useEffect(()=>{

updateCart()

},[])


  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 text-center"> {/* Centering the content on small screens */}
          <img
            src={successImage}
            alt="Payment Success"
            className="img-fluid my-4" 
            style={{ maxWidth: '150px' }} 
          />

          <h2 className="text-success mb-3">Payment Successful!</h2>
          <p className="text-muted">Thank you for your purchase. Your payment has been processed successfully.</p>
          <p className="text-muted">Click here to go to Home page</p>

          <Link to='/' className='back rounded-2 '>
           Home
      </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
