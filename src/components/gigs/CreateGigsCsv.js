import React, { Component } from "react";
import { connect } from "react-redux";
import { createGig } from "../../store/actions/gigActions";
import { Redirect } from "react-router-dom";
import CSVReader from "react-csv-reader";

class CreateGigsCsv extends Component {
  state = {
    data: []
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.createGig(this.state);
  // };

  handleForce = data => {
    this.setState({
      data
    });

    for (let gig of data) {
      let [date, profit, band] = gig;

      if (date.includes(".")) {
        date = date.split(".");
        date.pop();
      } else if (date.includes("-")) date = date.split("-");
      else date = date.split("/");

      let [day, month, year] = date;
      if (date.length === 3 && Number(profit)) {
        this.props.createGig({
          date: new Date([year, month, day].join("/")),
          profit: parseInt(profit, 10),
          band
        });
      }
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="custom-file">
        <CSVReader
          cssClass="react-csv-input"
          cssInputClass=" d-none"
          inputId="customFile"
          onFileLoaded={this.handleForce}
          parserOptions={{ encoding: "ISO 8859-2" }}
        />

        <label className="custom-file-label" htmlFor="customFile">
          Choose file
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createGig: gig => dispatch(createGig(gig))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGigsCsv);
