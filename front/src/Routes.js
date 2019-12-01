import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import RecruiterMain from "./containers/RecruiterMain"

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/recruiter" component={RecruiterMain} />


            <Route component={NotFound} />
        </Switch>
    );
}