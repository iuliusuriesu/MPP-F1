import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import DriversPage from "../pages/DriversPage";
import NewDriverPage from "../pages/NewDriverPage";
import ViewDriverPage from "../pages/ViewDriverPage";
import UpdateDriverPage from "../pages/UpdateDriverPage";
import PointsChartPage from "../pages/PointsChartPage";

function RoutingComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/drivers/:id" element={<ViewDriverPage />} />
          <Route path="/new-driver" element={<NewDriverPage />} />
          <Route path="/drivers/update/:id" element={<UpdateDriverPage />} />
          <Route path="/points-chart" element={<PointsChartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutingComponent;
