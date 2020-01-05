import React from "react";
import { Button } from "react-bootstrap";

class ListTests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tests: []};
    }

    getTests() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let body = JSON.parse(xhr.responseText).body;
                this.setState({tests: JSON.parse(body).tests});
                // console.log(this.state.tests);
            }
        }.bind(this);
        xhr.open("GET", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/gettesttemplates"/*, true*/);
        xhr.send();
    }

    createNewTest() {
        this.props.history.push("/recruiter/tests/newtesttemplate");
    }

    render() {
        return (
            <div className="ListTests">
                <h1>
                    Test list
                </h1>
                <table>
                    <thead>
                        <tr>Test name</tr>
                        <tr>Update</tr>
                        <tr>Delete</tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <Button onClick={() => this.getTests()}>
                    Print tests in console
                </Button>
                <Button onClick={() => this.createNewTest()}>
                    Create a new test
                </Button>
            </div>
        );
    }
}

export default ListTests