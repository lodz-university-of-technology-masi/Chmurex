import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.moveToUserHomePage = this.moveToUserHomePage.bind(this);
  }

  setEmail(email){
    this.setState({email: email});
  }

  setPassword(password){
    this.setState({password: password});
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log("After");
    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      Auth.currentAuthenticatedUser()
          .then(user => Auth.userAttributes(user))
          .then(attributes => this.moveToUserHomePage(attributes))
          .then(attributes => console.log(attributes))
          .catch(err => alert(err));

    } catch (e) {
      alert(e.message + "omk");
    }
  }

  moveToUserHomePage(attributes) {
    let val  = attributes[2].getValue();
    if(val === "1"){
      console.log("Going to recruiter main");
      this.props.history.push({
        pathname: "/recruiter",
        state: { loggedIn: true,
          isRecruiter: true}
      });
      console.log(this.props.history.location.state);
    }
    else {
      console.log("Going to candidate main");
      this.props.history.push({
        pathname: "/candidate",
        state: { loggedIn: true,
          isRecruiter: false}
      });
      console.log(this.props.history.location.state);
    }


  }
  render() {


  return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={e => this.setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
                value={this.state.password}
                onChange={e => this.setPassword(e.target.value)}
                type="password"
            />
          </FormGroup>
          <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
            Login
          </Button>
        </form>
      </div>
  );
  }
}

export default Login