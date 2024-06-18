import { useState } from "react";
import { Driver } from "../utils/Driver";
import { Link } from "react-router-dom";

interface DriverRowProps {
  driver: Driver;
  onDelete: (driverId: number) => void;
}

function DriverRow({ driver, onDelete }: DriverRowProps) {
  const [deleteConfirmMessage, setDeleteConfirmMessage] = useState(false);

  const handleDeleteClick = () => {
    if (!deleteConfirmMessage) {
      setDeleteConfirmMessage(true);
    }
  };

  const handleNoClick = () => {
    setDeleteConfirmMessage(false);
  };

  const handleYesClick = () => {
    if (driver.id !== undefined) {
      onDelete(driver.id);
    }
  };

  return (
    <tr>
      <td>{driver.name}</td>
      <td>{driver.team}</td>
      <td>{driver.points}</td>
      <td>
        <div>
          <Link to={`/drivers/${driver.id}`} className="btn btn-info mx-2">
            View
          </Link>
          <Link
            to={`/drivers/update/${driver.id}`}
            className="btn btn-warning mx-2"
          >
            Update
          </Link>
          <button className="btn btn-danger mx-2" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
        {deleteConfirmMessage ? (
          <div>
            <div>Are you sure you want to delete this driver?</div>
            <button className="btn btn-danger mx-2" onClick={handleYesClick}>
              Yes
            </button>
            <button className="btn btn-secondary mx-2" onClick={handleNoClick}>
              No
            </button>
          </div>
        ) : null}
      </td>
    </tr>
  );
}

export default DriverRow;
