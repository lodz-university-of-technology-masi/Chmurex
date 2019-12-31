import React from "react"
import { Button, Form, FormGroup, ControlLabel, FormControl } from "react-bootstrap";

class NewTestTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0, id: "", types: [], texts: [], answers: []};

        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeId(event) {
        this.setState({id: event.target.value});
    }

    handleChangeType(event, i) {
        let temp = [...this.state.types];
        temp[i] = event.target.value;
        this.setState({types: temp});
    }

    handleChangeText(event, i) {
        let temp = [...this.state.texts];
        temp[i] = event.target.value;
        this.setState({texts: temp});
    }

    handleChangeAnswer(event, i) {
        let temp = [...this.state.answers];
        temp[i] = [event.target.value];
        this.setState({answers: temp});
    }

    handleChangeMultipleAnswer(event, i) {
        let temp = [...this.state.answers];
        temp[i] = [event.target.value];
        this.setState({answers: temp});
    }

    handleIncrease() {
        let tempTypes = [...this.state.types];
        tempTypes.push("open");
        this.setState({types: tempTypes});

        let tempTexts = [...this.state.texts];
        tempTexts.push("");
        this.setState({texts: tempTexts});

        let tempAnswers = [...this.state.answers];
        tempAnswers.push("");
        this.setState({answers: tempAnswers});

        this.setState({count: this.state.count + 1});
    }

    handleSubmit(event) {
        event.preventDefault();
        let contents = {};
        contents[this.state.id] = {"questions": []};
        for (let i = 0; i < this.state.count; i++) {
            contents[this.state.id]["questions"].push({"question": {
                                                            "type": this.state.types[i],
                                                            "text": this.state.texts[i],
                                                            "answers": this.state.answers[i]
                                                            }
                                                      });
        }
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert("Successfully saved new test template");
            }
        };
        xhr.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/newtesttemplate");
        // xhr.send(JSON.stringify({"ID": this.state.id, "JSON": this.state.json}));
        console.log(JSON.stringify(contents, null, 4));
        // console.log(this.state.types);
        this.setState({id: "", json: ""});
    }

    renderForm() {
        let questions = [];
        for (let i = 0; i < this.state.count; i++) {
            questions.push(
                <div key={i}>
                    <FormGroup bsSize="large">
                        <ControlLabel>Question {i + 1} type</ControlLabel>
                        <FormControl componentClass="select" value={this.state.types[i]} onChange={(event) => this.handleChangeType(event, i)}>
                            <option value="open">Open</option>
                            <option value="numeric">Numeric</option>
                            <option value="choice">Choice</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Question {i + 1}</ControlLabel>
                        <FormControl type="text" value={this.state.texts[i]} onChange={(event) => this.handleChangeText(event, i)}/>
                    </FormGroup>
                    {this.renderAnswer(i)}
                    <hr style={{color: "pink", backgroundColor: "black", height: 2}}/>
                </div>
            );
        }
        return questions;
    }

    renderAnswer(i) {
        switch (this.state.types[i]) {
            case "open":
                return (
                    <FormGroup bsSize="large">
                        <ControlLabel>Answer {i + 1}</ControlLabel>
                        <FormControl type="text" value={this.state.answers[i]} onChange={(event) => this.handleChangeAnswer(event, i)}/>
                    </FormGroup>
                );
            case "numeric":
                return (
                    <FormGroup bsSize="large">
                        <ControlLabel>Answer {i + 1}</ControlLabel>
                        <FormControl type="number" value={this.state.answers[i]} onChange={(event) => this.handleChangeAnswer(event, i)}/>
                    </FormGroup>
                );
            case "choice":
                let answers = [];
                return (
                    <FormGroup bsSize="large">
                        <ControlLabel>Answer {i + 1}</ControlLabel>
                    </FormGroup>
                );
            default:
                break;
        }
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