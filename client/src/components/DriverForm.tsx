import { useEffect, useState } from "react";
import { Driver, defaultDriver } from "../utils/Driver";

interface DriverFormProps {
  type: "add" | "update";
  driver?: Driver;
}

function DriverForm({ type, driver }: DriverFormProps) {
  const [formData, setFormData] = useState<Driver>(defaultDriver);
  const [alert, setAlert] = useState<any>(null);

  useEffect(() => {
    if (driver) setFormData(driver);
  }, [driver]);

  const addDriverRequest = async () => {
    await fetch("http://localhost:8080/drivers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.json();
      })
      .then(() => {
        setFormData(defaultDriver);
        const newAlert = (
          <div className="alert alert-success mt-3">
            Driver added successfully!
          </div>
        );
        setAlert(newAlert);
      })
      .catch((error) => {
        console.error("Error adding driver", error);
        const newAlert = (
          <div className="alert alert-danger mt-3">
            {(error as Error).message}
          </div>
        );
        setAlert(newAlert);
      });
  };

  const updateDriverRequest = async () => {
    await fetch(`http://localhost:8080/drivers/${driver?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.json();
      })
      .then(() => {
        const newAlert = (
          <div className="alert alert-success mt-3">
            Driver updated successfully!
          </div>
        );
        setAlert(newAlert);
      })
      .catch((error) => {
        console.error("Error updating driver", error);
        const newAlert = (
          <div className="alert alert-danger mt-3">
            {(error as Error).message}
          </div>
        );
        setAlert(newAlert);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (type === "add") {
      addDriverRequest();
    } else {
      updateDriverRequest();
    }
  };

  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFormData: Driver = {
      ...formData,
      name: event.target.value,
    };
    setFormData(newFormData);
  };

  const handleTeamInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFormData: Driver = {
      ...formData,
      team: event.target.value,
    };
    setFormData(newFormData);
  };

  const handlePointsInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFormData: Driver = {
      ...formData,
      points: parseFloat(event.target.value),
    };
    setFormData(newFormData);
  };

  const submitButton =
    type === "add" ? (
      <button type="submit" className="btn btn-danger">
        Add
      </button>
    ) : (
      <button type="submit" className="btn btn-warning">
        Update
      </button>
    );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nameInput" className="form-label">
          Name
        </label>
        <input
          id="nameInput"
          className="form-control"
          value={formData.name}
          onChange={handleNameInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="teamInput" className="form-label">
          Team
        </label>
        <input
          id="teamInput"
          className="form-control"
          value={formData.team}
          onChange={handleTeamInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="pointsInput" className="form-label">
          Points
        </label>
        <input
          id="pointsInput"
          type="number"
          className="form-control"
          name="points"
          value={formData.points}
          onChange={handlePointsInputChange}
          step={0.1}
          min={0}
          max={1000}
          required
        />
      </div>

      {submitButton}

      {alert}
    </form>
  );
}

export default DriverForm;
