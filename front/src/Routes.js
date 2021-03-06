import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import RecruiterMain from "./containers/RecruiterMain";
import AppliedRoute from "./components/AppliedRoute";
import CandidateMain from "./containers/CandidateMain";
import NewTestTemplate from "./containers/NewTestTemplate";
import CandidateTests from "./containers/CandidateTests";
import AddNewCandidate from "./containers/AddNewCandidate"
import ListCandidates from "./containers/listCandidates"
import RemoveCandidate from "./containers/removeCandidate"
import Translate from "./containers/Translate"

import ListTests from "./containers/ListTests";
import UpdateTest from "./containers/UpdateTest";
import AssignTestsToCandidate from "./containers/assignTestsToCandidate"
import CsvImport from "./containers/csvImport"
import FillOutTest from "./containers/FillOutTest";

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Login} appProps={appProps} />
            <Route path="/recruiter" exact component={RecruiterMain} appProps={appProps} />
            <Route path="/recruiter/csvimport" exact component={CsvImport} appProps={appProps} />
            <Route path="/recruiter/addnewcandidate" exact component={AddNewCandidate} appProps={appProps} />
            <Route path="/recruiter/tests" exact component={ListTests} appProps={appProps} />
            <Route path="/recruiter/tests/newtesttemplate" exact component={NewTestTemplate} appProps={appProps} />
            <Route path="/recruiter/tests/updatetest" exact component={UpdateTest} appProps={appProps} />
            <Route path="/candidate" exact component={CandidateMain} appProps={appProps} />
            <Route path="/candidate/tests" exact component={CandidateTests} appProps={appProps} />
            <Route path="/recruiter/listCandidates" exact component={ListCandidates} appProps={appProps} />
            <Route path="/recruiter/listCandidates/removeCandidate" exact component={RemoveCandidate} appProps={appProps}/>
            <Route path="/recruiter/listCandidates/assignTestsToCandidate" exact component={AssignTestsToCandidate} appProps={appProps}/>
            <Route path="/candidate/tests/fillOutTest" exact component={FillOutTest} appProps={appProps}/>
            <Route path="/recruiter/tests/translate" exact component={Translate} appProps={appProps} />
            <Route component={NotFound} />
        </Switch>
    );
}