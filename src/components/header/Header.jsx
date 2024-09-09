import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="">
      <Link to="/">Home</Link>
      <Link to="/login">login</Link>
      <Link to="/register">register</Link>
    </div>
  );
};

export default Header;
