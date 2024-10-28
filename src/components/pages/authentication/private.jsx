import {useState,useEffect} from "react";
import {useAuth} from '../../context/auth.jsx';
import { Outlet} from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.jsx";

const PrivateRoute = () => {
    const [auth,setAuth]=useAuth();
    const [ok,setOk]=useState(false)
    useEffect(()=>{  
       const authCheck=async()=>{
        try{
       const res=await axios.get(`${import.meta.env.VITE_API}/api/v1/user/user-auth`,{
       headers:{
           "Authorization":auth.token
           }
       });
     if(res.data.success){
      setOk(true)
      }
    }
    catch(error){
      setOk(false)
    }
    }
   if(auth.token) { authCheck();
    }
  },
  [auth?.token]
); 
      return ok ? <Outlet/> :<Spinner ok={ok}/>
  }   


export default PrivateRoute;