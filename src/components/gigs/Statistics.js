import React, { Component } from "react";
import { connect } from "react-redux";
import { createGig } from "../../store/actions/gigActions";
import { Redirect } from "react-router-dom";
import Example from "../charts/LineChart";
import DonutChart from "../charts/DonutChart";
import LineChart from "../charts/LineChart";
// class Statistics extends Component {
//   handleChange = e => {
//     this.setState({
//       [e.target.id]: e.target.value
//     });
//   };

//   handleDate(date, e) {
//     this.setState({
//       date
//     });
//   }
//   handleSubmit = e => {
//     e.preventDefault();
//     // console.log(this.state);
//     this.props.createGig(this.state);
//     this.props.history.push("/home");
//   };
//   render() {
//     const { auth } = this.props;
//     if (!auth.uid) return <Redirect to="/signin" />;
//     if (this.props.gigs) {
//       console.log(
//         new Set(
//           this.props.gigs.map(gig =>
//             new Date(gig.date.seconds * 1000).getFullYear()
//           )
//         )
//       );
//       return <div className="container">    <Example ></Example>Statistics Tab</div>;
//     } else
//       return (
//         <div>

//           Gigs loading...
//         </div>
//       );
//   }
// }

import Chart from "react-apexcharts";

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   options: {
      //     chart: {
      //       id: "basic-bar"
      //     },
      //     xaxis: {
      //       categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      //     }
      //   },
      //   series: [
      //     {
      //       name: "series-1",
      //       data: [30, 40, 45, 50, 49, 60, 70, 91]
      //     }
      //   ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="pt-4 linechart-wrapper">
          <LineChart width="100%" height="auto"></LineChart>
        </div>

        <div>
          <DonutChart></DonutChart>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    gigs: state.firestore.ordered.gigs
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
)(Statistics);
