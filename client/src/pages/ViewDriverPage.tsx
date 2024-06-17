import { useParams } from "react-router-dom";
import { Driver, defaultDriver } from "../utils/Driver";

interface ViewDriverPageProps {
  driverList: Driver[];
}

function ViewDriverPage({ driverList }: ViewDriverPageProps) {
  const { id } = useParams();
  const driverId = id ? parseInt(id) : 0;

  let driver = driverList.find((driver) => driver.id === driverId);
  if (driver === undefined) {
    driver = defaultDriver;
  }

  return (
    <div className="text-center">
      <h1 className="h1">{driver.name}</h1>
      <h2 className="h2">{driver.team}</h2>
      <h3 className="h3">{driver.points} points</h3>
    </div>
  );
}

export default ViewDriverPage;
