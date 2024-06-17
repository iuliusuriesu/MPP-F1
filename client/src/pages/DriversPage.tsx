import { Link } from "react-router-dom";
import DriversList from "../components/DriversList";
import { Driver } from "../utils/Driver";

interface DriversPageProps {
  driverList: Driver[];
  onDelete: (driverId: number) => void;
}

function DriversPage({ driverList, onDelete }: DriversPageProps) {
  return (
    <div className="p-3">
      <h1 className="h1 text-center">Driver List</h1>
      <DriversList driverList={driverList} onDelete={onDelete} />
      <Link to="/new-driver" className="btn btn-danger">
        New Driver
      </Link>
    </div>
  );
}

export default DriversPage;
