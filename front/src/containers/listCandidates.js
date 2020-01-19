import React from "react";
import {Button} from "react-bootstrap";

import "./listCandidates.css"

class ListCandidates extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clickedUser:'',
            users: 'elo',
            completed: 'Loading'
        };
    }
    render() {
        return (
            <div className="ListCandidates">
                <h1>
                    {this.state.completed}
                </h1>
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Assign test</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {                
                            Object.keys(this.state.users).map((key) => {
                            return( 
                            <tr>
                                <td>{ this.state.users[key].sub }</td>
                                <td>{ this.state.users[key].email }</td>
                                <td>
                                    <Button type="button" onClick={() => {
                                        this.assignTests(this.state.users[key].sub, this.state.users[key].email);
                                }
                                    }>
                                    Assign
                                </Button></td>
                                <td>
                                    <Button type="button" onClick={() => {
                                        this.removeCandidate(this.state.users[key].sub, this.state.users[key].email);
                                    }
                                        }>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                            );
                            })
                        }                        
                    </tbody>                    
                </table>
                <Button block onClick={this.props.history.goBack}>
                    Go Back
                </Button>
            </div>
            );
    }

    removeCandidate = (sub,email) => {
        console.log("remove " + sub);
        this.props.history.push({
            pathname: "/recruiter/listCandidates/removeCandidate",
            state: { sub: sub, 
                email: email}
          });
        console.log(this.clickedUser)
    };

    assignTests = (sub,email) => {
        console.log("assign tests to " + sub);
        this.props.history.push({
            pathname: "/recruiter/listCandidates/assignTestsToCandidate",
            state: { sub: sub,
                email: email}
        })
    }

    componentDidMount(){
        this.getCandidates(this.setUsers,this.setCompleted);
    }

    setUsers(usersObjects){
        this.setState({users:usersObjects});
    }

    setCompleted(completed){
        this.setState({completed:completed});
    }

    getCandidates = (callback,callback2) => {
        let req = new XMLHttpRequest();
        var self = this;
        req.open('GET', 'https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/getcandidates', true);
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if(req.status === 200){
                    let text = req.responseText;
                    let obj = JSON.parse(text);
                    let usersObjects = JSON.parse(obj.body);
                    callback.call(self, usersObjects);
                    callback2.call(self,'Candidate list');
                }
                else
                    console.log("Błąd podczas ładowania strony\n");
            }
        };
        req.send(null);
    }
}
    

export default ListCandidates