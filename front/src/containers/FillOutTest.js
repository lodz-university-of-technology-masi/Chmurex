import React from "react";
import {Button, Form, FormControl, FormGroup, InputGroup} from "react-bootstrap";

class FillOutTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignedTest: "",
            assignedTestsToPost: "",
            mainMessage: "loading",
            testInstanceID: this.props.location.state.testID + this.props.location.state.email,
            ready: true,
            answers: []
        }

    }

    render() {
        return (
            <div className="fillOutTest">
                <h1>Create a new test</h1>
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>Test name</InputGroup.Addon>
                            <FormControl readOnly type="text" value={this.props.location.state.testID}/>
                        </InputGroup>
                    </FormGroup>
                    {this.renderRows()}
                    <Button type="submit" style={{
                        display: "inline-block",
                        backgroundColor: "#00C3ED",
                        color: "#FFFFFF",
                        fontWeight: "bold"
                    }}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }

    setAssignedTest(assignment) {
        this.setState({assignedTest: assignment, ready: true});
    }

    setMainMessage(message) {
        this.setState({mainMessage: message});
    }

    getTest = (callback1, callback2) => {
        let req = new XMLHttpRequest();
        let self = this;
        req.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/gettesttemplate", true);
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    let text = req.responseText;
                    let obj = JSON.parse(text);
                    let assignmentObject = JSON.parse(obj.body);
                    let testOut = JSON.parse(assignmentObject.test);
                    console.log(testOut);
                    console.log("Questions" + self.props.location.state.testID);
                    let questions = testOut["Questions" + self.props.location.state.testID].questions;
                    callback1.call(self, questions);
                    callback2.call(self, "This is the test to fill out:");
                }
            }
        };
        console.log('{"ID":"' + this.props.location.state.testID + '"}');
        req.send('{"ID":"' + this.props.location.state.testID + '"}');
    };

    componentDidMount() {
        this.getTest(this.setAssignedTest, this.setMainMessage);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.flagTestAsFinished();
    }

    redirectUser(){
        this.props.history.push({
            pathname: "/candidate/tests"
        })
    }
    renderQuestion(question, key) {
        return (
            <div key={key + "Q"}>
                <InputGroup>
                    <InputGroup.Addon>{"Question " + (parseInt(key) + 1)}</InputGroup.Addon>
                    <FormControl type="text" value={question.text} readOnly={true}/>
                </InputGroup>
            </div>
        )
    }

    handleChangeAnswer(event, i) {
        let temp = [...this.state.answers];
        temp[i] = event.target.value;
        this.setState({answers: temp});
    }

    renderAnswer(question, key) {
        switch (question.type) {
            case "o":
            case "open":
                return (
                    <div key={key + "A"}>
                        <InputGroup>
                            <InputGroup.Addon>{"Answer " + (parseInt(key) + 1)}</InputGroup.Addon>
                            <FormControl placeholder="Enter some text" type="text" value={this.state.answers[key] || ""}
                                         onChange={(event) => this.handleChangeAnswer(event, key)}/>
                        </InputGroup>
                    </div>
                );
            case "n":
            case "numeric":
                return (
                    <div key={key + "A"}>
                        <InputGroup>
                            <InputGroup.Addon>{"Answer " + (parseInt(key) + 1)}</InputGroup.Addon>
                            <FormControl placeholder="Enter a number" type="number"
                                         value={this.state.answers[key] || ""}
                                         onChange={(event) => this.handleChangeAnswer(event, key)}/>
                        </InputGroup>
                    </div>
                );
            case "c":
            case "choice":
                return (
                    <div key={key + "A"}>
                        <InputGroup>
                            <InputGroup.Addon>{"Answer " + (parseInt(key) + 1)}</InputGroup.Addon>
                            <FormControl placeholder="Choose" componentClass="select"
                                         value={this.state.answers[key] || ""}
                                         onChange={(event) => this.handleChangeAnswer(event, key)}>
                                {this.renderOptions(question.answers)}
                            </FormControl>
                        </InputGroup>
                    </div>
                );
            default:
                return (
                    <div key={key + "A"}>
                        <InputGroup>
                            <InputGroup.Addon>{"Answer " + (parseInt(key) + 1)}</InputGroup.Addon>
                            <FormControl type="text" value="omg" readOnly={true}/>
                        </InputGroup>
                    </div>
                );
        }
    }

    renderOptions(possibleAnswers) {
        let rows = [];
        Object.keys(possibleAnswers).map((key) => {
            rows.push(
                <option key={key + possibleAnswers[key]} value={possibleAnswers[key]}>{possibleAnswers[key]}</option>
            )
        });
        return rows;
    }

    renderRows() {
        let rows = [];
        Object.keys(this.state.assignedTest).map((key) => {
            let minrow = [];
            minrow.push(
                this.renderQuestion(this.state.assignedTest[key].question, key)
            );
            minrow.push(
                this.renderAnswer(this.state.assignedTest[key].question, key)
            );
            rows.push(<FormGroup key={key}>
                {minrow}
            </FormGroup>)
        });
        return rows;
    }

    flagTestAsFinished() {
        this.getAssignmentTable(this.setAssignedTestsToPost);
    }

    setAssignedTestsToPost(tests) {
        this.setState({assignedTestsToPost: tests})
    }

    getAssignmentTable = (callback1) => {
        let req = new XMLHttpRequest();
        let self = this;
        req.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/getassignmenttable", true);
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    let text = req.responseText;
                    let obj = JSON.parse(text);
                    let assignmentObject = JSON.parse(obj.body);
                    callback1.call(self, assignmentObject);
                    self.setAssignmentTable(self.props.location.state.testID);
                }
            }
        };
        req.send('{"ID":"' + this.props.location.state.email + '"}');
    };

    setAssignmentTable(testID) {
        let freshTest = this.state.assignedTestsToPost.tests;
        let tests = freshTest;
        let self = this;
        Object.keys(freshTest).map((key) => {
            if(freshTest[key].test.testID === this.props.location.state.testID){
                tests[key].test.finished = true;
                return;
            }
        });
        console.log(tests);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4){
                self.putAnswersToDB();
            }
        };
        let answers = { tests }
        let stringifiedTest = JSON.stringify(answers);
        console.log(stringifiedTest);
        xhr.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/assigntest");
        console.log(JSON.stringify({"email": this.props.location.state.email, "JSON": stringifiedTest}));
        xhr.send(JSON.stringify({"email": this.props.location.state.email, "JSON": stringifiedTest}));
    }

    putAnswersToDB(){
        let xhr = new XMLHttpRequest();
        let self = this;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {

                self.redirectUser();
            }
        };
        xhr.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/candidate/putanswerindb");
        console.log(this.state.testInstanceID);
        xhr.send(JSON.stringify({"ID": this.state.testInstanceID, "JSON": JSON.stringify(this.state.answers, null, 4)}));
    }
}

export default FillOutTest