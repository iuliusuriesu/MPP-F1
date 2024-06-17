import { useEffect, useState } from "react";
import { Driver, defaultDriver } from "../utils/Driver";

interface DriverFormProps {
  type: "add" | "update";
  onAdd?: (driver: Driver) => void;
  driver?: Driver;
  onUpdate?: (driverId: number, driver: Driver) => void;
}

function DriverForm({ type, onAdd, driver, onUpdate }: DriverFormProps) {
  const [formData, setFormData] = useState<Driver>(defaultDriver);

  useEffect(() => {
    if (driver) setFormData(driver);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onAdd) {
      onAdd(formData);
      setFormData(defaultDriver);
    } else if (onUpdate && driver && driver.id) {
      onUpdate(driver.id, formData);
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
          required
        />
      </div>

      {submitButton}
    </form>
  );
}

export default DriverForm;
