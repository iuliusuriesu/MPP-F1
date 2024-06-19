import DriverRow from "./DriverRow";
import { Driver } from "../utils/Driver";

interface DriverListProps {
  driverList: Driver[];
  onDelete: (driverId: number) => void;
}

function DriversList({ driverList, onDelete }: DriverListProps) {
  const driverRows = driverList.map((driver) => {
    return <DriverRow key={driver.id} driver={driver} onDelete={onDelete} />;
  });

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Team</th>
          <th>Points</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>{driverRows}</tbody>
    </table>
  );
}

export default DriversList;
