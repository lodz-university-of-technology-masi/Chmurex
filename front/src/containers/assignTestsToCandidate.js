import React from "react";
import {Button} from "react-bootstrap";


class AssignTestsToCandidate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            assignedTests:'emptyA'
        }
    }

    render() {
        return (
            <div className="assignTestsToCandidate">
                <h1>
                    This is the page to assign test to candidate { this.props.location.state.email}!
                </h1>
                <h2>This is the list of all his assignments:</h2>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>Assigned test</th>
                        <th>Completed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Object.keys(this.state.assignedTests).map((key) => {
                            return (
                                <tr>
                                    <td>{this.state.assignedTests[key].testID}</td>
                                    <td>{this.state.assignedTests[key].finished}</td>
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
        req.open("GET", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/getassignmenttable",true);
        req.onreadystatechange = function () {
          if(req.readyState === 4){
              if(req.status === 200){
                  let text = req.responseText;
                  let obj = JSON.parse(text);
                  let assignmentObject = JSON.parse(obj.body);
                  console.log(assignmentObject.toString())
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