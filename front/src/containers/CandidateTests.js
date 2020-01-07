import React from "react";
import {Auth} from "aws-amplify";
import {Button} from "react-bootstrap";

class CandidateTests extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            assignedTests: JSON.parse('{"tests":[]}'),
            mainMessage: "loading",
            email: "",
            ready: false
        }
        Auth.currentAuthenticatedUser().then(user => {
                console.log(user.attributes.email);
                this.setState({email: user.attributes.email});
                this.getAssignmentTable(this.setAssignedTests, this.setMainMessage);
            });
    }


    render() {
        return (
            <div className="CandidateTests">
                <h1>
                    Candidate Tests Page  { this.state.email }
                </h1>
                <h2> {this.state.mainMessage} </h2>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>Test ID</th>
                        <th>Fill out</th>
                    </tr>
                    </thead>{
                    <tbody>
                    {
                        Object.keys(this.state.assignedTests.tests).map((key) => {
                            if(this.state.ready){
                                if(this.state.assignedTests.tests[key].test.finished){
                                    return(
                                        <tr key={"sectablerow" + key}>
                                            <td key={this.state.assignedTests.tests[key] + "1"}>{ this.state.assignedTests.tests[key].test.testID }</td>
                                            <td key={this.state.assignedTests.tests[key] + "2"}>
                                                Tests finished
                                            </td>
                                        </tr>
                                    );
                                }
                                else {
                                    return(
                                        <tr key={"sectablerow" + key}>
                                            <td key={this.state.assignedTests.tests[key] + "1"}>{ this.state.assignedTests.tests[key].test.testID }</td>
                                            <td key={this.state.assignedTests.tests[key] + "2"}>
                                                <Button type="button" >
                                                    { this.state.assignedTests.tests[key].test.finished.toString() }
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                }

                            }
                        })
                    }
                    </tbody>
                }
                </table>



            </div>
        );
    }


    setAssignedTests(assignments){ this.setState({assignedTests: assignments} ); }

    setMainMessage(message){ this.setState({mainMessage: message, ready: true} ); }


    getAssignmentTable = (callback1, callback2) => {
        let req = new XMLHttpRequest();
        let self = this;
        req.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/getassignmenttable",true);
        req.onreadystatechange = function () {
            if(req.readyState === 4){
                if(req.status === 200){
                    console.log(req.responseText);
                    let text = req.responseText;
                    let obj = JSON.parse(text);
                    console.log(obj.body);
                    let assignmentObject = JSON.parse(obj.body);
                    callback1.call(self, assignmentObject);
                    callback2.call(self, "This is the list of all your assignments:");
                    console.log(self.state.assignedTests);

                }
            }
        };
        console.log(this.state.email);
        req.send('{"ID":"'+ this.state.email +'"}');
    }

}





export default CandidateTests;