import React from "react"
import { Button, Form, FormGroup, ControlLabel, FormControl } from "react-bootstrap";

class NewTestTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0, id: '', json: '', types: ['open'], texts: ['']};

        this.handleChangeTypes = this.handleChangeTypes.bind(this);
        this.handleChangeTexts = this.handleChangeTexts.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleChangeJson = this.handleChangeJson.bind(this);
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTypes(event) {
        let temp = [...this.state.types];
        temp.pop();
        temp.concat(event.target.value);
        this.setState({types: temp});
    }

    handleChangeTexts(event) {
        let temp = [...this.state.texts];
        temp.pop();
        temp.concat(event.target.value);
        this.setState({texts: temp});
    }

    handleChangeId(event) {
        this.setState({id: event.target.value});
    }

    handleChangeJson(event) {
        this.setState({json: event.target.value});
    }

    handleIncrease() {
        this.setState({count: this.state.count + 1});
    }

    handleSubmit(event) {
        event.preventDefault();
        // let contents = {};
        // contents[this.state.id] = {"questions": []};
        // for (let i = 0; i < this.state.count; i++) {
        //     contents[this.state.id]["questions"].push({"question": {"type": this.state.types[i]}});
        // }
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert("Successfully saved new test template");
            }
        };
        xhr.open('POST', 'https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/newtesttemplate');
        // xhr.send(JSON.stringify({"ID": this.state.id, "JSON": this.state.json}));
        // console.log(JSON.stringify(contents, null, 4));
        console.log(this.state.texts);
        this.setState({id: '', json: ''});
    }

    renderForm() {
        let questions = [];
        for (let i = 0; i < this.state.count; i++) {
            questions.push(
                <div key={i}>
                    <FormGroup bsSize="large">
                        <ControlLabel>Question {i + 1} type</ControlLabel>
                        <FormControl componentClass="select" value={this.state.types[i]} onChange={this.handleChangeTypes}>
                            <option value="open">Open</option>
                            <option value="choice">Choice</option>
                            <option value="numeric">Numeric</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Question {i + 1}</ControlLabel>
                        <FormControl type="text" value={this.state.texts[i]} onChange={this.handleChangeTexts}/>
                    </FormGroup>
                </div>
            );
        }
        return questions;
    }

    render() {
        return(
            <div className="NewTestTemplate">
                <h1>Create test</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup bsSize="large">
                        <ControlLabel>Test name</ControlLabel>
                        <FormControl type="text" value={this.state.id} onChange={this.handleChangeId}/>
                    </FormGroup>
                    {this.renderForm()}
                    <Button block bsSize="large" onClick={this.handleIncrease}>
                        New question
                    </Button>
                    <Button block bsSize="large" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default NewTestTemplate

/*
{
    "QuestionsTest1EN": {
        "questions": [
            {
                "question": {
                    "type": "O",
                    "text": "Wypowiedz sie",
                    "answers": [

                    ]
                }
            },
            {
                "question": {
                    "type": "W",
                    "text": "Która z tych odpowiedzi",
                    "answers": [
                        "a",
                        "b",
                        "c"
                    ]
                }
            },
            {
                "question": {
                    "type": "L",
                    "text": "Podaj wartosc liczbowa",
                    "answers": [

                    ]
                }
            }
        ]
    }
}
 */