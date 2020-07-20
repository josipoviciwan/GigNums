import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const GigDetails = props => {
  const { gig, auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (gig) {
    return (
      <div className="container section gig-details">
        <div className="card z-depth-0">
          <div className="card-content">
            
            <span className="card-title">{gig.band}</span>
            <p>{gig.profit}</p>
            <div>Date : {gig.date.toDate().toLocaleDateString()}</div>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>
              Posted by {gig.authorFirstName} {gig.authorLastName}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading gig...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const gigs = state.firestore.data.gigs;
  const gig = gigs ? gigs[id] : null;
  return {
    gig: gig,
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(GigDetails);
