import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";



export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await Auth.signIn(email, password);
      var moveToRecruiter = 0;
      props.userHasAuthenticated(true);
      Auth.currentAuthenticatedUser()
          .then(user => Auth.userAttributes(user))
          .then(attributes => moveToUserHomePage(attributes))
          .catch(err => alert(err));

    } catch (e) {
      alert(e.message);
    }
  }

  function moveToUserHomePage(attributes) {
    var obj = JSON.parse(attributes[2]);
    if(obj.Value == 1){
      props.history.push("/recruiter");
    }
    else {
      props.history.push("/candidate");
    }


  }
  return (
      <div className="Login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
                autoFocus
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
            />
          </FormGroup>
          <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Login
          </Button>
        </form>
      </div>
  );
}