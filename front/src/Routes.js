import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import RecruiterMain from "./containers/RecruiterMain";
import AppliedRoute from "./components/AppliedRoute";
import CandidateMain from "./containers/CandidateMain";
import NewTestTemplate from "./containers/NewTestTemplate";
import CandidateProfile from "./containers/CandidateProfile";
import CandidateTests from "./containers/CandidateTests";
import AddNewCandidate from "./containers/AddNewCandidate"

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />
            <AppliedRoute path="/login" exact component={Login} appProps={appProps} />

            <Route path="/recruiter" exact component={RecruiterMain} appProps={appProps} />
            <Route path="/recruiter/addnewcandidate" exact component={AddNewCandidate} appProps={appProps} />
            <Route path="/recruiter/newtesttemplate" exact component={NewTestTemplate} appProps={appProps} />
            <Route path="/candidate" exact component={CandidateMain} appProps={appProps} />
            <Route path="/candidate/profile" exact component={CandidateProfile} appProps={appProps} />
            <Route path="/candidate/tests" exact component={CandidateTests} appProps={appProps} />

            <Route component={NotFound} />
        </Switch>
    );
}