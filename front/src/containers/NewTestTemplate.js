import React from "react"
import { Button, Form, FormGroup, ControlLabel, FormControl } from "react-bootstrap";

class NewTestTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: '', json: '', mode: 'open'};

        this.handleChangeMode = this.handleChangeMode.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleChangeJson = this.handleChangeJson.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeMode(event) {
        this.setState({mode: event.target.value});
    }

    handleChangeId(event) {
        this.setState({id: event.target.value});
    }

    handleChangeJson(event) {
        this.setState({json: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert("Successfully saved new test template");
            }
        };
        xhr.open('POST', 'https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/newtesttemplate');
        xhr.send(JSON.stringify({"ID": this.state.id, "JSON": this.state.json}));
        this.setState({id: '', json: ''});
    }

    renderOpenForm() {
        if (this.state.mode === 'open') {
            return (
                <FormGroup bsSize="large">
                    <ControlLabel>Question</ControlLabel>
                    <FormControl type="text" value={this.state.json} onChange={this.handleChangeJson}/>
                </FormGroup>
            );
        } else {
            return null;
        }
    }

    renderChoiceForm() {
        if (this.state.mode === 'choice') {
            return (
                <output>choice placeholder</output>
            );
        } else {
            return null;
        }
    }

    renderNumericForm() {
        if (this.state.mode === 'numeric') {
            return (
                <output>numeric placeholder</output>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="NewTestTemplate">
                <h1>Create test</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup bsSize="large">
                        <ControlLabel>Test type</ControlLabel>
                        <FormControl componentClass="select" value={this.state.mode} onChange={this.handleChangeMode}>
                            <option value="open">Open</option>
                            <option value="choice">Choice</option>
                            <option value="numeric">Numeric</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Test ID</ControlLabel>
                        <FormControl type="text" value={this.state.id} onChange={this.handleChangeId}/>
                    </FormGroup>
                    {this.renderOpenForm()}
                    {this.renderChoiceForm()}
                    {this.renderNumericForm()}
                    <Button block bsSize="large" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default NewTestTemplate