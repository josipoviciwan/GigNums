import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import GigDetails from "./components/gigs/GigDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Statistics from "./components/gigs/Statistics";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="">
          <Navbar />
          <Switch>
            <Route exact path="/home" component={Dashboard} />
            <Route exact path="/gig/:id" component={GigDetails} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/statistics" component={Statistics} />
            <Route path="/*" component={SignIn} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    gigs: state.firestore.ordered,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.auth.uid) return [];
    else {
      return [
        {
          collection: "gigs",
          where: ["authorId", "==", props.auth.uid],
          orderBy: ["date", "desc"]
        }
      ];
    }
  })
)(App);
