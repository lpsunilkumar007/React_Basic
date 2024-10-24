import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const logoutClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault(); // Prevent form submission
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link text-dark" to="/default">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/default/about">About</Link>
            </li>
          </ul>

          {/* Form moved to the top right */}
          <form className="form-inline logout-btn">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={logoutClick}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}

export default Header;
