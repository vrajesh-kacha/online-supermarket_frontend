import React, { useEffect ,useState} from 'react'
import { useAuth } from '../../context/auth';
import Spinner from '../Spinner';
import { Outlet } from 'react-router-dom';
import axios from "axios";
const Admin = () => {
    const [auth,setAuth]=useAuth();
    const [ok,setOk]=useState(false)
    useEffect(()=>{  
       const adminCheck=async()=>{
       const res=await axios.get(`${import.meta.env.VITE_API}/api/v1/user/admin-auth`,{
       headers:{
           "Authorization":auth?.token
           }
       });
     if(res.data.success){
      setOk(true)
      }
      else{
        setOk(false)
      }
    }
   if(auth?.token) { adminCheck() }
  },
  [auth?.token]
); 
      return ok ? <Outlet/> :<Spinner ok={ok}/>
  }   



export default Admin
