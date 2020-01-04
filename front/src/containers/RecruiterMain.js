import React from "react";
import { Button } from "react-bootstrap"

export default function RecruiterMain(props) {

    function tests() {
        props.history.push("recruiter/tests");
    }

    function addNewCandidate() {
        props.history.push("/recruiter/addnewcandidate");
    }

    function listCandidates() {
        props.history.push("/recruiter/listCandidates");
    }

    return (
        <div className="RecruiterMain">
            <h1>
                Recruiter Placeholder Page
            </h1>
            <Button block bsSize="large"  onClick={tests}>
                Tests
            </Button>
            <Button block bsSize="large"  onClick={addNewCandidate}>
                Add new candidate
            </Button>
            <Button block bsSize="large"  onClick={listCandidates}>
                List candidates
            </Button>
        </div>
    );
}