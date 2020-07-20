import React from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { Navbar } from "react-bootstrap";
import { faGuitar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NavbarComponent = props => {
  const { auth, profile } = props;
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <div className="container">
        <Navbar.Brand>
          <FontAwesomeIcon icon={faGuitar} /> GigNums
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {links}
      </div>
    </Navbar>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(
  mapStateToProps,
  null,
  null,
  {
    pure: false //For nav-links top be active
  }
)(NavbarComponent);
