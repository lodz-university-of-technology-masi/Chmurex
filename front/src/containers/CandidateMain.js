import React from "react";
import { Button } from "react-bootstrap"

export default function CandidateMain(props) {

    function viewProfile() {
        props.history.push("/candidate/profile");
    }

    function viewTests() {
        props.history.push("/candidate/tests");
    }

    return (
        <div className="CandidateMain">
            <h1>
                Candidate Page
            </h1>
            <Button block bsSize="large" onClick={viewTests}>
                View your tests
            </Button>
        </div>
    );
}