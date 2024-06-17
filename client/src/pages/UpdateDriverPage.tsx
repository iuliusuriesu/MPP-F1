import { useParams } from "react-router-dom";
import DriverForm from "../components/DriverForm";
import { Driver, defaultDriver } from "../utils/Driver";

interface UpdateDriverPageProps {
  driverList: Driver[];
  onUpdate: (driverId: number, driver: Driver) => void;
}

function UpdateDriverPage({ driverList, onUpdate }: UpdateDriverPageProps) {
  const { id } = useParams();
  const driverId = id ? parseInt(id) : 0;

  let driver = driverList.find((driver) => driver.id === driverId);
  if (driver === undefined) {
    driver = defaultDriver;
  }

  return (
    <div className="p-3">
      <h1 className="h1 text-center">Update Driver</h1>
      <DriverForm type="update" driver={driver} onUpdate={onUpdate} />
    </div>
  );
}

export default UpdateDriverPage;
