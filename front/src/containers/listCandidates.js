import React from "react";
import {Button} from "react-bootstrap";

import "./listCandidates.css"
import {Auth} from "aws-amplify";

class ListCandidates extends React.Component{
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            clickedUser:'',
            users: 'elo',
            completed: 'Loading'
        };
    }
    render() {
        console.log(this);
        console.log(this.props);
        console.log(this.props.history);
        console.log(this.props.history.location);
        console.log(this.props.history.state);
        console.log(this.props.history.location.state);
        try{
            if(this.props.history.state.loggedIn === false){
                alert("User not logged in");
                this.props.history.push("/login");
                return null;
            }
            else {
                if(this.props.history.state.isRecruiter === false){
                    alert("User not a recruiter");
                    this.props.history.push("/candidate");
                    return null;
                }
            }
        }
        catch (e) {
            console.log(e.message);
            alert("User not logged in");
            this.props.history.push("/login");
            return null;
        }
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
    };

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
                    console.log("1" + req.responseText);
                    let obj = JSON.parse(text);
                    console.log("2" + obj);
                    let usersObjects = JSON.parse(obj.body);
                    console.log(usersObjects);
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