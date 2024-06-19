import { Link } from "react-router-dom";
import DriversList from "../components/DriversList";
import { useEffect, useState } from "react";
import { Driver } from "../utils/Driver";

function DriversPage() {
  const [driverList, setDriverList] = useState<Driver[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const fetchDrivers = async () => {
    await fetch(
      `http://localhost:8080/driver-page/${currentPage}?pageSize=${pageSize}`,
      {
        method: "GET",
      }
    )
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

  useEffect(() => {
    fetchDrivers();
  }, [currentPage, pageSize]);

  const handlePreviousClick = () => {
    if (currentPage === 1) {
      return;
    }

    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPageSize = parseInt(event.target.value);
    setPageSize(newPageSize);
  };

  return (
    <div className="p-3">
      <h1 className="h1 text-center mb-2">Driver List</h1>

      <div className="text-center">
        <select onChange={handleDropdownChange} defaultValue={pageSize}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <DriversList driverList={driverList} onDelete={handleDelete} />

      <Link to="/new-driver" className="btn btn-danger">
        New Driver
      </Link>

      <div className="mt-4 text-center">
        <button className="btn btn-info mx-1" onClick={handlePreviousClick}>
          {"< Previous"}
        </button>
        <button className="btn btn-primary mx-1" disabled>
          {currentPage}
        </button>
        <button className="btn btn-info mx-1" onClick={handleNextClick}>
          {"Next >"}
        </button>
      </div>
    </div>
  );
}

export default DriversPage;
