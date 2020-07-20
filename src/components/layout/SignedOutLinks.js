import React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto" variant="pills">
        <NavItem eventkey={1} href="/signup">
          <Nav.Link as={NavLink} to="/signup">
            Sign Up
          </Nav.Link>
        </NavItem>
        
        <NavItem eventkey={1} href="/signin">
          <Nav.Link as={NavLink} to="/signin">
            Log In
          </Nav.Link>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  );
};

export default SignedOutLinks;
