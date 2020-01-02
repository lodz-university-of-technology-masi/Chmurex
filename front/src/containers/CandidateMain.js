import React from "react";
import { Button } from "react-bootstrap"

export default function CandidateMain(props) {

    function viewProfile() {
        props.history.push("/candidate/profile");
    }

    function viewTests() {
        props.history.push("/recruiter/tests");
    }

    return (
        <div className="CandidateMain">
            <h1>
                Candidate Placeholder Page
            </h1>
            <Button block bsSize="large" onClick={viewProfile}>
                View your profile details
            </Button>
            <Button block bsSize="large" onClick={viewTests}>
                View your tests
            </Button>
            <Button block bsSize="large" onClick={props.history.goBack}>
                Go Back
            </Button>
        </div>
    );
}