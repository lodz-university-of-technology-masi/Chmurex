import React from "react";
import {Button, Form, FormControl, FormGroup, InputGroup} from "react-bootstrap";

class UpdateTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (this.props.location.search).slice(4),
            count: 0,
            language: "EN",
            types: [],
            texts: [],
            answers: []
        };

        this.getTest();
    }

    getTest() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let body = JSON.parse(xhr.responseText).body;
                let json = JSON.parse(body).test[0];
                let questions = JSON.parse(json)["Questions" + this.state.id];
                console.log(questions);
            }
        }.bind(this);
        xhr.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/gettesttemplate", true);
        xhr.send(JSON.stringify({"ID": this.state.id}));
    }

    render() {
        return (
            <div className="UpdateTest">
                <h1>Update test</h1>
            </div>
        );
    }
}

export default UpdateTest