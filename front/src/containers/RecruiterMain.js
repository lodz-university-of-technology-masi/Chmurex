import React from "react";
import { Button } from "react-bootstrap"

export default function RecruiterMain(props) {

    function createNewTemplate() {
        props.history.push("/recruiter/newtesttemplate");
    }

    function addNewCandidate() {
        props.history.push("/recruiter/addnewcandidate");
    }

    
    function listCandidates() {
        props.history.push("/recruiter/listCandidates");
    }

    function csvImport() {
        props.history.push("/recruiter/csvImport");
    }

    return (
        <div className="RecruiterMain">
            <h1>
                Recruiter Placeholder Page
            </h1>
            <Button block bsSize="large"  onClick={createNewTemplate}>
                Create new Test template
            </Button>
            <Button block bsSize="large"  onClick={csvImport}>
               Csv import test template
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