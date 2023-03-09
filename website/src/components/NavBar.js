import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="mb-3">
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
