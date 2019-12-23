import React from "react";
import {Button} from "react-bootstrap";
import {FormControl, FormGroup, ControlLabel} from "react-bootstrap";

class AddNewCandidate extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            name: '',
            email: 'eee',
            pass: ''
        }
        this.handleChange.bind(this)
    }
    
    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
      }
      
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
      }s

    validateInput(){
        return this.state.email.lenght > 0
    }
    
    handleSubmit = event => {
        if (!this.validate()) {
            event.preventDefault()
        }
    };

    render() {
        return (
            <div className="AddNewCandidate">
                <h1>
                    Add new candidatee
                </h1>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="emailadd" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="email"
                            value={this.state.email}
                            onChange={(event) => this.setState({ email: this.state.email = event.target.value})}
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
