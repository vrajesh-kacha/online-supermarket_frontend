
import { useAuth } from "../context/auth.jsx";
import UserMenu from "./layouts/UserMenu.jsx";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> User Name : {auth?.user?.name}</h3>
              <h3> User Email : {auth?.user?.email}</h3>
              <h3> User Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;


