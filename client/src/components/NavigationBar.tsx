import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/drivers" className="nav-link">
        Drivers
      </Link>
      <Link to="/new-driver" className="nav-link">
        New Driver
      </Link>
      <Link to="/points-chart" className="nav-link">
        Points Chart
      </Link>
    </nav>
  );
}

export default NavigationBar;
