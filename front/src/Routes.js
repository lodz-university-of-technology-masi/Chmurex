import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import RecruiterMain from "./containers/RecruiterMain";
import { Redirect } from "react-router";
import AppliedRoute from "./components/AppliedRoute";


export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />
            <AppliedRoute path="/login" exact component={Login} appProps={appProps} />

            <Route path="/recruiter" exact component={RecruiterMain} appProps={appProps} />


            <Route component={NotFound} />
        </Switch>
    );
}