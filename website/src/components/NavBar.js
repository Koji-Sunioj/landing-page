import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Container, Nav } from "react-bootstrap";

import { useState } from "react";
import { Link } from "react-router-dom";
import { cssPointers } from "../utils/data";

const NavBar = ({ data }) => {
  const [mode, setMode] = useState("light");
  const updateMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    Object.entries(cssPointers[newMode]).forEach((entry) => {
      const [key, value] = entry;
      document.documentElement.style.setProperty(key, value);
    });
    document.body.style.backgroundColor = mode === "light" ? "black" : "white";
    setMode(newMode);
  };

  return (
    <Navbar expand="lg" className="mb-3" sticky="top" variant={mode}>
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
