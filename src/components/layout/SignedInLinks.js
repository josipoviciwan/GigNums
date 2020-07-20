import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { Nav, Navbar, NavItem } from "react-bootstrap";

const SignedInLinks = props => {
  return (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto" variant="pills">
        <NavItem href="/home">
          <Nav.Link as={NavLink} to="/home">
            Home
          </Nav.Link>
        </NavItem>

        <NavItem href="/statistics">
          <Nav.Link as={NavLink} to="/statistics">
            Statistics
          </Nav.Link>
        </NavItem>

        <NavItem onClick={props.signOut} href="/signin">
          <Nav.Link as={NavLink} to="/signin">
            Log out
          </Nav.Link>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps,
  null,
  {
    pure: false //For nav-links top be active
  }
)(SignedInLinks);
