import React from "react";
import {Button, Form, FormControl, FormGroup, InputGroup} from "react-bootstrap";

class FillOutTest extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            assignedTest: "",
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
                            <FormControl readOnly type="text" value={this.props.location.state.testID} />
                        </InputGroup>
                    </FormGroup>
                    { this.renderRows() }
                    <Button type="submit" style={{display: "inline-block", backgroundColor: "#00C3ED", color: "#FFFFFF", fontWeight: "bold"}}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }

    setAssignedTest(assignment){
        this.setState({assignedTest: assignment, ready: true} );
    }

    setMainMessage(message){ this.setState({mainMessage: message} ); }

    getTest = (callback1, callback2) => {
        let req = new XMLHttpRequest();
        let self = this;
        req.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/gettesttemplate",true);
        req.onreadystatechange = function () {
            if(req.readyState === 4){
                if(req.status === 200){
                    let text = req.responseText;
                    let obj = JSON.parse(text);
                    let assignmentObject = JSON.parse(obj.body);
                    let testOut = JSON.parse(assignmentObject.test);
                    let questions = testOut["Questions" + self.props.location.state.testID].questions;
                    callback1.call(self, questions);
                    callback2.call(self, "This is the test to fill out:");
                }
            }
        };
        req.send('{"ID":"'+ this.props.location.state.testID +'"}');
    };

    componentDidMount() {
        this.getTest(this.setAssignedTest, this.setMainMessage);
    }
    handleSubmit(event) {
        event.preventDefault();
        alert("There was a submission!");
    }

    renderQuestion(question, key){
        return(
            <div key={key + "Q"}>
                    <InputGroup>
                        <InputGroup.Addon>{"Question " + (parseInt(key) + 1)}</InputGroup.Addon>
                        <FormControl type="text" value={question.text} readOnly={true} />
                    </InputGroup>
            </div>
            )
    }

    handleChangeAnswer(event, i) {
        let temp = [...this.state.answers];
        temp[i] = event.target.value;
        this.setState({answers: temp});
    }

    renderAnswer(question, key){
        switch (question.type) {
            case "open":
                return(
                    <div key={key + "A"}>
                        <InputGroup>
                            <InputGroup.Addon>{"Answer " + (parseInt(key) + 1)}</InputGroup.Addon>
                            <FormControl placeholder="Enter some text" type="text" value={this.state.answers[key] || ""} onChange={(event) => this.handleChangeAnswer(event, key)} />
                        </InputGroup>
                    </div>
                );
            case "numeric":
                return(
                    <div key={key + "A"}>
                        <InputGroup>
                            <InputGroup.Addon>{"Answer " + (parseInt(key) + 1)}</InputGroup.Addon>
                            <FormControl placeholder="Enter a number" type="number" value={this.state.answers[key] || ""} onChange={(event) => this.handleChangeAnswer(event, key)} />
                        </InputGroup>
                    </div>
                );
            case "choice":
                return(
                    <div key={key + "A"}>
                        <InputGroup>
                            <InputGroup.Addon>{"Answer " + (parseInt(key) + 1)}</InputGroup.Addon>
                            <FormControl placeholder="Choose" componentClass="select" value={this.state.answers[key] || ""} onChange={(event) => this.handleChangeAnswer(event, key)} >
                                {this.renderOptions(question.answers)}
                            </FormControl>
                        </InputGroup>
                    </div>
                );
            default:
                return(
                    <div key={key + "A"}>
                        <InputGroup>
                            <InputGroup.Addon>{"Answer " + (parseInt(key) + 1)}</InputGroup.Addon>
                            <FormControl type="text" value="omg" readOnly={true} />
                        </InputGroup>
                    </div>
                );
        }
    }

    renderOptions(possibleAnswers){
        let rows= [];
        Object.keys(possibleAnswers).map((key) =>
        {
            rows.push(
                    <option key={key + possibleAnswers[key]} value={possibleAnswers[key]}>{possibleAnswers[key]}</option>
            )
        });
        return rows;
    }

    renderRows(){
        let rows = [];
        Object.keys(this.state.assignedTest).map((key) =>
        {
            let minrow = [];
            minrow.push(
                this.renderQuestion(this.state.assignedTest[key].question,key)
            );
            minrow.push(
                this.renderAnswer(this.state.assignedTest[key].question,key)
            );
            rows.push(<FormGroup  key={key} >
                {minrow}
            </FormGroup>)
        });
        return rows;
    }
}
export default FillOutTest