import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Container, Nav } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeMode } from "../app/reducers/lightSlice";

const NavBar = ({ mode, data }) => {
  const dispatch = useDispatch();

  const updateMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    const bodyBg = mode === "light" ? "black" : "white";
    dispatch(changeMode(newMode));
    document.body.style.backgroundColor = bodyBg;
    if (mode === "light") {
      document.documentElement.style.setProperty("--font-color", "white");
      document.documentElement.style.setProperty("--bg-color", "black");
    } else {
      document.documentElement.style.setProperty("--font-color", "black");
      document.documentElement.style.setProperty("--bg-color", "white");
    }
  };

  return (
    <Navbar bg={mode} expand="lg" variant={mode} className="mb-3" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/resume">
              Resume
            </Nav.Link>
            <Nav.Link as={Link} to="/portfolio">
              Portfolio
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              as={Link}
              to="https://www.linkedin.com/in/koji-inoue-14647b56/"
            >
              <i className="fab fa-linkedin-in"></i>
            </Nav.Link>
            <Nav.Link as={Link} to="https://github.com/Koji-Sunioj/">
              <i className="fa-brands fa-github"></i>
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            {data !== null && (
              <Nav.Link as={Link} to="/metrics">
                Site Metrics
              </Nav.Link>
            )}
          </Nav>
          {mode === "light" ? (
            <Button variant="light" onClick={updateMode}>
              &#x2600;
            </Button>
          ) : (
            <Button variant="dark" onClick={updateMode}>
              &#x263E;
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
