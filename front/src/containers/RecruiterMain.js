import React from "react";
import { Button } from "react-bootstrap"

export default function RecruiterMain(props) {

    function createNewTemplate() {
        props.history.push("/recruiter/newtesttemplate");
    }

    return (
        <div className="RecruiterMain">
            <h1>
                Recruiter Placeholder Page
            </h1>
            <Button block bsSize="large"  onClick={createNewTemplate}>
                Create new Test template
            </Button>
        </div>
    );
}