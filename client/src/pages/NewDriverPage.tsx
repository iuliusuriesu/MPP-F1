import DriverForm from "../components/DriverForm";
import { Driver } from "../utils/Driver";

interface NewDriverPageProps {
  onAdd: (driver: Driver) => void;
}

function NewDriverPage({ onAdd }: NewDriverPageProps) {
  return (
    <div className="p-3">
      <h1 className="h1 text-center">New Driver</h1>
      <DriverForm type="add" onAdd={onAdd} />
    </div>
  );
}

export default NewDriverPage;
