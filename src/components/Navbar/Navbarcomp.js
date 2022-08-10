import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { myContext } from "../../Context.js";
import { Collapse } from "bootstrap";

function Navbarcomp() {
  const context = useContext(myContext);

  const logout = () => {
    axios
      .get("https://sanskrit-cms-backend.herokuapp.com/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Whole res value: ", res);
          window.location.href = "/";
        }
      });
  };

  var collapseElementList = [].slice.call(
    document.querySelectorAll(".collapse")
  );
  function collapseList() {
    collapseElementList.map(function (collapseEl) {
      return new Collapse(collapseEl);
    });
  }
  collapseList();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <Navbar.Brand as={Link} to="/">
            Sanskrit Literature CMS
          </Navbar.Brand>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              {context ? (
                <>
                  {" "}
                  <li className="nav-item active">
                    <Nav.Link
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target=".navbar-collapse.show"
                      as={Link}
                      to="/dashboard"
                    >
                      Dashboard
                    </Nav.Link>
                  </li>
                  <li className="nav-item">
                    <Nav.Link
                      className="nav-link"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target=".navbar-collapse.show"
                      as={Link}
                      to="/public"
                    >
                      Public
                    </Nav.Link>
                  </li>
                  <li className="nav-item">
                    <Nav.Link
                      className="nav-link"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target=".navbar-collapse.show"
                      // style={{ color: "white" }}
                      as={Link}
                      to="/create"
                    >
                      Create
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link
                      className="nav-link"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target=".navbar-collapse.show"
                      onClick={logout}
                    >
                      {" "}
                      Logout
                    </Nav.Link>
                  </li>{" "}
                </>
              ) : (
                <li>
                  <Nav.Link
                    className="nav-link"
                    href="#"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                    as={Link}
                    to="/login"
                  >
                    {" "}
                    Login
                  </Nav.Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbarcomp;
