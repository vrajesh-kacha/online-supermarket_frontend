import { createContext ,useState,useEffect,useContext} from "react";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
  const [auth,setAuth]=useState({
           user:null,
           token:""
});
useEffect(()=>{
  const data=localStorage.getItem('auth');
  if(data){
    const parsedata=JSON.parse(data);
  setAuth({
    token:parsedata.token,
    user:parsedata.user
  })
  }
},[])
    return( <AuthContext.Provider value={[auth,setAuth]}>
        {children}
    </AuthContext.Provider>
    );
}


export const useAuth=()=>useContext(AuthContext)
