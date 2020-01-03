import React from "react";
import { Auth } from "aws-amplify";
import {Button} from "react-bootstrap";
import {FormControl, FormGroup, ControlLabel} from "react-bootstrap";

class AddNewCandidate extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            email: '',
            password: '',
            newUser:{}
        }
    }

    validateInput(){
        return this.state.email.length > 0 &&
        this.state.password.length > 6
    };
    
    handleSubmit() {
        let xhr = new XMLHttpRequest();
            xhr.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/addcandidate",true);
            xhr.onload = function () {
                console.log("dodawanko");
            };
            xhr.send('{"email":"'+ this.state.email+'","password":"'+this.state.password+'"}');
    }

    render() {
        return (
            <div className="AddNewCandidate">
                <h1>
                    Add new candidate
                </h1>
                <form>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="email"
                            value={this.state.email}
                            onChange={(event) => this.setState({ email: this.state.email = event.target.value})}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={(event) => this.setState({ password: this.state.password = event.target.value})}
                        />
                    </FormGroup>

                    <Button block bsSize="large" disabled={!this.validateInput()} type="button" onClick={() => {
                                        this.handleSubmit();
                                    }
                                        }>
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

export default AddNewCandidate
