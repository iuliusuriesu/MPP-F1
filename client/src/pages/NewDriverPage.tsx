import DriverForm from "../components/DriverForm";

function NewDriverPage() {
  return (
    <div className="p-3">
      <h1 className="h1 text-center">New Driver</h1>
      <DriverForm type="add" />
    </div>
  );
}

export default NewDriverPage;
