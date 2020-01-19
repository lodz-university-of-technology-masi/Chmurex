import React from "react"
import { Button, Form, FormControl, FormGroup, InputGroup } from "react-bootstrap";
import {Auth} from "aws-amplify";

class NewTestTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            language: "EN",
            count: 0,
            types: [],
            texts: [],
            answers: []
        };
        Auth.currentAuthenticatedUser().then(user => {
            console.log(user.attributes.email);
            this.setState({email: user.attributes.email});
        });
    }

    handleChangeId(event) {
        this.setState({id: event.target.value});
    }

    handleChangeLanguage(event) {
        this.setState({language: event.target.value});
    }

    handleChangeType(event, i) {
        let tempTypes = [...this.state.types];
        tempTypes[i] = event.target.value;
        this.setState({types: tempTypes});

        let tempAnswers = [...this.state.answers];
        if (Array.isArray(tempAnswers[i])) {
            tempAnswers[i] = [];
            this.setState({answers: tempAnswers});
        }
    }

    handleChangeText(event, i) {
        let temp = [...this.state.texts];
        temp[i] = event.target.value;
        this.setState({texts: temp});
    }

    handleChangeMultipleAnswer(event, i, j) {
        let temp = [...this.state.answers];
        temp[i][j] = event.target.value;
        this.setState({answers: temp});
    }

    handleAddQuestion() {
        let tempTypes = [...this.state.types];
        tempTypes.push("o");
        this.setState({types: tempTypes});

        let tempTexts = [...this.state.texts];
        tempTexts.push("");
        this.setState({texts: tempTexts});

        let tempAnswers = [...this.state.answers];
        tempAnswers.push([]);
        this.setState({answers: tempAnswers});

        this.setState({count: this.state.count + 1});
    }

    handleDeleteQuestion(i) {
        let tempTypes = [...this.state.types];
        tempTypes.splice(i, 1);
        this.setState({types: tempTypes});

        let tempTexts = [...this.state.texts];
        tempTexts.splice(i, 1);
        this.setState({texts: tempTexts});

        let tempAnswers = [...this.state.answers];
        tempAnswers.splice(i, 1);
        this.setState({answers: tempAnswers});

        this.setState({count: this.state.count - 1});
    }

    handleAddAnswer(i) {
        let tempAnswers = [...this.state.answers];
        if (Array.isArray(tempAnswers[i])) {
            tempAnswers[i].push("");
        } else {
            tempAnswers[i] = [""];
        }
        this.setState({answers: tempAnswers});
    }

    handleDeleteAnswer(i, j) {
        let tempAnswers = [...this.state.answers];
        tempAnswers[i].splice(j, 1);
        this.setState({answers: tempAnswers});
    }

    validateInput() {
        if (this.state.count === 0 || this.state.id.trim() === "") {
            return false;
        }

        let textsOk = true;
        for (let i = 0; i < this.state.texts.length; i++) {
            if (this.state.texts[i].trim() === "") {
                textsOk = false;
                return false;
            }
        }

        let answersOk = true;
        for (let i = 0; i < this.state.answers.length; i++) {
            if (Array.isArray(this.state.answers[i])) {
                for (let j = 0; j < this.state.answers[i].length; j++) {
                    if (this.state.answers[i][j].trim() === "") {
                        answersOk = false;
                        return false;
                    }
                }
            }
        }

        return textsOk && answersOk;
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        if (!this.validateInput()) {
            alert("Every field must contain a value");
        } else {
            let contents = {};
            let name = "Questions" + this.state.id + this.state.language;
            contents[name] = {"questions": []};
            for (let i = 0; i < this.state.count; i++) {
                contents[name]["questions"].push({
                    "question": {
                        "type": this.state.types[i],
                        "text": this.state.texts[i],
                        "answers": this.state.answers[i]
                    }
                });
            }
            contents[name]["owner"] = this.state.email;
            let xhr = new XMLHttpRequest();
            console.log(contents);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (JSON.parse(xhr.responseText).statusCode === 400) {
                        alert("Test already exists in database");
                    } else {
                        alert("Successfully saved new test template");
                        this.setState({count: 0, id: "", language: "EN", types: [], texts: [], answers: []});
                    }
                }
            }.bind(this);
            xhr.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/newtesttemplate", true);
            xhr.send(JSON.stringify({"ID": this.state.id + this.state.language, "JSON": JSON.stringify(contents)}));
        }
    }

    renderForm() {
        let questions = [];
        for (let i = 0; i < this.state.count; i++) {
            questions.push(
                <div key={i}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>Question {i + 1} type</InputGroup.Addon>
                            <FormControl componentClass="select" value={this.state.types[i]} onChange={(event) => this.handleChangeType(event, i)}>
                                <option value="o">Open</option>
                                <option value="n">Numeric</option>
                                <option value="c">Choice</option>
                            </FormControl>
                            <InputGroup.Button onClick={() => this.handleDeleteQuestion(i)}>
                                <Button style={{backgroundColor: "#00C3ED", color: "#FFFFFF", fontWeight: "bold"}}>Delete question</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>Question {i + 1}</InputGroup.Addon>
                            <FormControl type="text" value={this.state.texts[i]} onChange={(event) => this.handleChangeText(event, i)}/>
                        </InputGroup>
                    </FormGroup>
                    {this.renderAnswer(i)}
                    <hr style={{backgroundColor: "#333333", height: 2}}/>
                </div>
            );
        }
        return questions;
    }

    renderAnswer(i) {
        if (this.state.types[i] === "c") {
            let answers = [];
            for (let j = 0; j < this.state.answers[i].length; j++) {
                answers.push(
                    <div key={i + " " + j}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>Answer {i + 1}.{j + 1}</InputGroup.Addon>
                                <FormControl type="text" value={this.state.answers[i][j]} onChange={(event) => this.handleChangeMultipleAnswer(event, i, j)}/>
                                <InputGroup.Button onClick={() => this.handleDeleteAnswer(i, j)}>
                                    <Button style={{backgroundColor: "#00C3ED", color: "#FFFFFF", fontWeight: "bold"}}>Delete answer</Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    </div>
                );
            }
            answers.push(
                <div key={this.state.answers[i].length + 1}>
                    <Button style={{backgroundColor: "#00C3ED", color: "#FFFFFF", fontWeight: "bold"}} onClick={() => this.handleAddAnswer(i)}>
                        New answer
                    </Button>
                </div>
            );
            return answers;
        }
    }

    render() {
        return(
            <div className="NewTestTemplate">
                <h1>Create a new test</h1>
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>Test name</InputGroup.Addon>
                            <FormControl type="text" value={this.state.id} onChange={(event) => this.handleChangeId(event)}/>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>Language</InputGroup.Addon>
                            <FormControl componentClass="select" value={this.state.language} onChange={(event) => this.handleChangeLanguage(event)}>
                                <option value="EN">English</option>
                                <option value="PL">Polish</option>
                            </FormControl>
                        </InputGroup>
                    </FormGroup>
                    <hr style={{backgroundColor: "#333333", height: 2}}/>
                    {this.renderForm()}
                    <Button onClick={this.props.history.goBack} style={{display: "inline-block", backgroundColor: "#00C3ED", color: "#FFFFFF", fontWeight: "bold"}}>
                        Back
                    </Button>
                    <Button onClick={() => this.handleAddQuestion()} style={{display: "inline-block", backgroundColor: "#00C3ED", color: "#FFFFFF", fontWeight: "bold"}}>
                        New question
                    </Button>
                    <Button type="submit" style={{display: "inline-block", backgroundColor: "#00C3ED", color: "#FFFFFF", fontWeight: "bold"}}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default NewTestTemplate