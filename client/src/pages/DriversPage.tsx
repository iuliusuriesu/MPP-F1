import { Link } from "react-router-dom";
import DriversList from "../components/DriversList";

function DriversPage() {
  return (
    <div className="p-3">
      <h1 className="h1 text-center">Driver List</h1>
      <DriversList />
      <Link to="/new-driver" className="btn btn-danger">
        New Driver
      </Link>
    </div>
  );
}

export default DriversPage;
