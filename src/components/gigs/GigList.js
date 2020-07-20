import React from "react";
import GigSummary from "./GigSummary";
import { connect } from "react-redux";

const GigList = props => {
  let gigs = props.gigs;
  if (gigs) {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-dark text-center table-hover ">
          <thead>
            <tr className="justify-content-center">
              <th>Date</th>
              <th>Profit</th>
              <th>Band</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {gigs &&
              gigs.map((gig, i) => {
                return <GigSummary gig={gig} key={gig.id + i}  />;
              })}
          </tbody>
        </table>
      </div>
    );
  } else return <div>Loading gigs...</div>;
};

const mapStateToProps = state => {
  return {
    gigs: state.firestore.ordered.gigs
  };
};

export default connect(mapStateToProps)(GigList);
