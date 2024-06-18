import { useParams } from "react-router-dom";
import DriverForm from "../components/DriverForm";
import { useEffect, useState } from "react";
import { defaultDriver } from "../utils/Driver";

function UpdateDriverPage() {
  const [driver, setDriver] = useState(defaultDriver);

  const { id } = useParams();
  const driverId = id ? parseInt(id) : 0;

  const fetchDriver = async () => {
    await fetch(`http://localhost:8080/drivers/${driverId}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not OK");
        }
        return response.json();
      })
      .then((data) => {
        setDriver(data);
      })
      .catch((error) => {
        console.error("Error fetching driver on ViewDriverPage", error);
      });
  };

  useEffect(() => {
    fetchDriver();
  }, []);

  return (
    <div className="p-3">
      <h1 className="h1 text-center">Update Driver</h1>
      <DriverForm type="update" driver={driver} />
    </div>
  );
}

export default UpdateDriverPage;
