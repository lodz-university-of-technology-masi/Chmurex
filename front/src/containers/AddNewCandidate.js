import React from "react";
import { Auth } from "aws-amplify";
import {Button} from "react-bootstrap";
import {FormControl, FormGroup, ControlLabel} from "react-bootstrap";

class AddNewCandidate extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            name: '',
            email: '',
            pass: '',
            newUser:{}
        }
    }

    validateInput(){
        return this.state.email.length > 0 &&
        this.state.password.length > 0
    };
    
    async handleSubmit(event) {
        if (!this.validateInput()) {
            event.preventDefault()
            try{
                const newUser = await Auth.signUp({
                    username: this.state.email,
                    password: this.state.password
                    });
                    this.state.newUser = newUser;
                } catch (e) {
                    alert(e.message);
                }
            }
        }

    render() {
        return (
            <div className="AddNewCandidate">
                <h1>
                    Add new candidatee
                </h1>
                <form onSubmit={this.handleSubmit}>
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

                    <Button block bsSize="large" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

export default AddNewCandidate
