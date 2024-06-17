import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

function MainLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default MainLayout;
