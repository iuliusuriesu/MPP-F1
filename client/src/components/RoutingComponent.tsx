import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import DriversPage from "../pages/DriversPage";
import NewDriverPage from "../pages/NewDriverPage";
import { useState } from "react";
import { DRIVERS, Driver } from "../utils/Driver";
import ViewDriverPage from "../pages/ViewDriverPage";
import UpdateDriverPage from "../pages/UpdateDriverPage";

function RoutingComponent() {
  const [driverList, setDriverList] = useState(DRIVERS);

  const deleteDriver = (driverId: number) => {
    const newDriverList = driverList.filter((driver) => driver.id !== driverId);
    setDriverList(newDriverList);
  };

  const addDriver = (driver: Driver) => {
    const lastId = driverList[driverList.length - 1].id;
    if (lastId === undefined) return;

    driver.id = lastId + 1;
    const newDriverList = driverList.slice();
    newDriverList.push(driver);
    setDriverList(newDriverList);
  };

  const updateDriver = (driverId: number, newDriver: Driver) => {
    const newDriverList = driverList.slice();
    const index = newDriverList.findIndex((driver) => driver.id === driverId);
    if (index === -1) return;

    newDriver.id = driverId;
    newDriverList[index] = newDriver;
    setDriverList(newDriverList);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/drivers"
            element={
              <DriversPage driverList={driverList} onDelete={deleteDriver} />
            }
          />
          <Route
            path="/drivers/:id"
            element={<ViewDriverPage driverList={driverList} />}
          />
          <Route
            path="/new-driver"
            element={<NewDriverPage onAdd={addDriver} />}
          />
          <Route
            path="/drivers/update/:id"
            element={
              <UpdateDriverPage
                driverList={driverList}
                onUpdate={updateDriver}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutingComponent;
