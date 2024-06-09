import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Manuel Calculate</Link>
        </li>
        <li>
          <Link to="/family">Family Calculate</Link>
        </li>
      </ul>
    </nav>
  );
};
