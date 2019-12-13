import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API, Logger } from "aws-amplify";

export default function NewTestTemplate(props) {

    const [question, setQuestion] = useState("");
    const options = {
        // statusCode: 200,
        headers: {
            "Content-Type" : "application/json",
            // "Access-Control-Allow-Headers" : "content-type, origin, accept, credentials, X-API-KEY",
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        }
        // body: JSON.stringify({ "message": "Hello World!" })
    };

    function createNewTemplate() {
        alert("CreateNewTemplateButtonPushed")
        props.history.push("/recruiter");
    }

    function validateForm() {
        return question.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await foo();
        } catch (e) {
            alert(e);
        }
    }

    //TypeError: headers[key].trim is not a function???
    function foo() {
        return API.get("chmurex", "/recruiter/newtesttemplate", options);
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