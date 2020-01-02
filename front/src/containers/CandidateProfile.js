import React from "react";
import {Button} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//polecam robic komponenty jako klasy :)
class CandidateProfile extends React.Component {

    state = {
        startDate: new Date()
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleSubmit = event => {
        if (!this.validate()) {
            event.preventDefault()
        }
    };

    render() {
        return (
            <div className="CandidateProfile">
                <h1>
                    Candidate Profile Page
                </h1>
                <form ref="form" onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input type="text" name="name" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Date of birth:
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <Button block bsSize="large" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
                {/*tutaj zrobilem zwykle przekierowanie do url'a zamiast props.history.goBack, bo po submicie trzeba by bylo klikac 2 razy*/}
                <Button block bsSize="large" onClick={event => window.location.href='/candidate'}>
                    Go Back
                </Button>
            </div>
        );
    }
}

export default CandidateProfile