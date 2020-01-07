import React from "react";
import {Button} from "react-bootstrap";

class AssignTestsToCandidate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            assignedTests: JSON.parse('{"tests":[]}'),
            mainMessage: "loading",
            testsToAssign: JSON.parse('{"tests":[]}'),
            nextTestsMessage: "loading", ready: false
        }
    }

    render() {
        return (
            <div className="assignTestsToCandidate">
                <h1>This is the page to assign test to candidate { this.props.location.state.email}!</h1>
                <h2>{this.state.mainMessage}</h2>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>Assigned test</th>
                        <th>Completed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Object.keys(this.state.assignedTests.tests).map((key) => {
                            return(
                                <tr key={key}>
                                    <td key={key + this.state.assignedTests.tests[key].test.testID}>
                                        { this.state.assignedTests.tests[key].test.testID }</td>
                                    <td key={key + this.state.assignedTests.tests[key].test.finished.toString()}>
                                        { this.state.assignedTests.tests[key].test.finished.toString() }</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <h2>{ this.state.nextTestsMessage }</h2>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>Test ID</th>
                        <th>Assign</th>
                    </tr>
                    </thead>{
                    <tbody>
                    {
                        Object.keys(this.state.testsToAssign.tests).map((key) => {

                            if(this.state.ready){
                                return(
                                    <tr key={"sectablerow" + key}>
                                        <td key={this.state.testsToAssign.tests[key] + "1"}>{ this.state.testsToAssign.tests[key] }</td>
                                        <td key={this.state.testsToAssign.tests[key] + "2"}>
                                            <Button type="button" onClick={() => {
                                                this.assignTest(this.state.testsToAssign.tests[key]);}}>
                                                Assign
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            }
                        })
                    }
                    </tbody>
                }
                </table>
            </div>
        );
    }

    removeDuplicates(){
        let createdTab = [];
        this.state.testsToAssign.tests.forEach((unassignedTest, index) => {
            let rewriteFlag = true;
            this.state.assignedTests.tests.forEach(assignedTest => {
                if(unassignedTest === assignedTest.test.testID){rewriteFlag = false;}
            })
            if(rewriteFlag){createdTab.push(unassignedTest);}
        });
        this.state.testsToAssign.tests = createdTab;
        this.setState({ready: true});
    }

    componentDidMount(){this.getAssignmentTable(this.setAssignedTests, this.setMainMessage);}

    getAssignmentTable = (callback1, callback2) => {
        let req = new XMLHttpRequest();
        let self = this;
        req.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/getassignmenttable",true);
        req.onreadystatechange = function () {
          if(req.readyState === 4){
              if(req.status === 200){
                  let text = req.responseText;
                  let obj = JSON.parse(text);
                  let assignmentObject = JSON.parse(obj.body);
                  callback1.call(self, assignmentObject);
                  callback2.call(self, "This is the list of all his assignments:");
                  self.getUnassignedTests(self.setTestsToAssign, self.setNextTestsMessage);
              }
          }
        };
        req.send('{"ID":"'+ this.props.location.state.email +'"}');
    }

    setAssignedTests(assignments){ this.setState({assignedTests: assignments} ); }

    setMainMessage(message){ this.setState({mainMessage: message} ); }

    getUnassignedTests = (callback1, callback2) => {
        let req = new XMLHttpRequest();
        let self = this;
        req.open("GET", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/gettesttemplates",true);
        req.onreadystatechange = function () {
            if(req.readyState === 4){
                if(req.status === 200){
                    let text = req.responseText;
                    let obj = JSON.parse(text);
                    let assignmentObject = JSON.parse(obj.body);
                    callback1.call(self, assignmentObject);
                    callback2.call(self, "This is the list of all tests that can be assigned:");
                    self.removeDuplicates()
                }
            }
        };
        req.send(null);
    }
    setTestsToAssign(moreTests){this.setState({testsToAssign: moreTests})}

    setNextTestsMessage(message){this.setState({nextTestsMessage: message} );}

    assignTest(testID){
        let freshTest = {test: {testID: testID, finished: false} };
        this.state.assignedTests.tests.push(freshTest);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4){ window.location.reload(); }
        };
        let stringifiedTest = JSON.stringify(this.state.assignedTests);
        xhr.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/assigntest");
        console.log(JSON.stringify({"email": this.props.location.state.email, "JSON": stringifiedTest}));
        xhr.send(JSON.stringify({"email": this.props.location.state.email, "JSON": stringifiedTest}));
    }
}

export default AssignTestsToCandidate