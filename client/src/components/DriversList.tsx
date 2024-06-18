import { useEffect, useState } from "react";
import DriverRow from "./DriverRow";
import { Driver } from "../utils/Driver";

function DriversList() {
  const [driverList, setDriverList] = useState<Driver[]>([]);

  const fetchDrivers = async () => {
    await fetch("http://localhost:8080/drivers", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not OK");
        }
        return response.json();
      })
      .then((data) => {
        setDriverList(data);
      })
      .catch((error) => {
        console.error("Error fetching driver list", error);
      });
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleDelete = async (driverId: number) => {
    await fetch(`http://localhost:8080/drivers/${driverId}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.json();
      })
      .then((data) => {
        console.log("Driver deleted successfully", data);
      })
      .catch((error) => {
        console.error("Error deleting driver", error);
      });

    fetchDrivers();
  };

  const driverRows = driverList.map((driver) => {
    return (
      <DriverRow key={driver.id} driver={driver} onDelete={handleDelete} />
    );
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
