import React from "react";
import {Button} from "react-bootstrap";
import {JS} from "aws-amplify";


class AssignTestsToCandidate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            assignedTests: JSON.parse('{\"tests\":[{\"test\":{\"testID\":\"temp\",\"finished\":true}},{\"test\":{\"testID\":\"temp\",\"finished\":false}}]}')
        }
    }

    render() {
        return (
            <div className="assignTestsToCandidate">
                <h1>
                    This is the page to assign test to candidate { this.props.location.state.email}!
                </h1>
                <h2>This is the list of all his assignments:</h2>
                <h2>{this.state.assignedTests.tests[0].test.testID }</h2>
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
                                <tr>
                                    <td>{ this.state.assignedTests.tests[key].test.testID }</td>
                                    <td>{ this.state.assignedTests.tests[key].test.finished.toString() }</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount(){
        this.getAssignmentTable(this.setAssignedTests);
    }
    getAssignmentTable = (callback1) => {
        let req = new XMLHttpRequest();
        let self = this;
        req.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/getassignmenttable",true);
        req.onreadystatechange = function () {
          if(req.readyState === 4){
              if(req.status === 200){
                  let text = req.responseText;
                  console.log("1" + req.responseText);
                  let obj = JSON.parse(text);
                  console.log("2" + obj);
                  let assignmentObject = JSON.parse(obj.body);
                  callback1.call(self, assignmentObject);
              }
              else {
                  console.log("Blad podczas pobierania przypisan kandydata")
              }
          }
        };
        req.send('{"ID":"'+ this.props.location.state.email +'"}');
    }

    setAssignedTests(assignments){
        this.setState({assignedTests: assignments} );
    }
}

export default AssignTestsToCandidate