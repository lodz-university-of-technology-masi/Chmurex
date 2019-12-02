import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default function NewTestTemplate(props) {

    const [question, setQuestion] = useState("");

    function createNewTemplate() {
        alert("CreateNewTemplateButtonPushed")
        props.history.push("/recruiter");
    }
    function validateForm() {
        return question.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        createNewTemplate();
    }


    return (
        <div className="NewTestTemplate">
            <h1>
                Create Test Placeholder Page
            </h1>
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="question" bsSize="large">
                    <ControlLabel>Question</ControlLabel>
                    <FormControl
                        autoFocus
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Create
                </Button>
            </form>
        </div>
    );
}