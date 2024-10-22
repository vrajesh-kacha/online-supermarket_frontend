import React,{useEffect} from "react";
import { NavLink, Link } from "react-router-dom";
import "../index.css";
import { useAuth } from "../../context/auth.jsx";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Box } from '@mui/material';
import { useCart } from "../../context/cartContext.jsx";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart]=useCart()

const parseJwt=(token)=> {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

const isTokenExpired=(token)=> {
    const decodedToken = parseJwt(token);
    if (!decodedToken || !decodedToken.exp) {
        return true; 
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
}
  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  useEffect(() => {
    const token = auth?.token;
    if (token && isTokenExpired(token)) {
      handleLogout();
    }
  }, [auth]);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
            SUPERMARKET
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  HOME
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link"
                      aria-disabled="true"
                    >
                      REGISTER
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      LOGIN
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {JSON.parse(localStorage.getItem("auth"))?.user.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink to={`/dashboard/${auth.user.role==="admin" ? "admin" : "profile"}`}  className="dropdown-item">
                         Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )
              }
              <li className="nav-item">
          <NavLink to="/dashboard/cart" className="nav-link">
            <Box display="flex" flexDirection="column" alignItems="center" mt={0}>
           <Badge badgeContent={auth?.token ? cart.length:0} color="primary">
            <ShoppingCartIcon style={{ fontSize: 25 }} />
           </Badge>
          </Box>
          </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
