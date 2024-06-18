import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultDriver } from "../utils/Driver";

function ViewDriverPage() {
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
    <div className="text-center">
      <h1 className="h1">{driver.name}</h1>
      <h2 className="h2">{driver.team}</h2>
      <h3 className="h3">{driver.points} points</h3>
    </div>
  );
}

export default ViewDriverPage;
