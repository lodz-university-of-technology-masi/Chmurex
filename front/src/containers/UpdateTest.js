import React from "react";
import {Button, Form, FormControl, FormGroup, InputGroup} from "react-bootstrap";

class UpdateTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (this.props.location.search).slice(4, this.props.location.search.length - 2),
            language: (this.props.location.search).slice(this.props.location.search.length - 2),
            count: 0,
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
                let questions = JSON.parse(json)["Questions" + this.state.id + this.state.language].questions;
                for (let i = 0; i < questions.length; i++) {
                    this.setState({count: this.state.count + 1});
                    this.setState({types: [...this.state.types, questions[i].question.type]});
                    this.setState({texts: [...this.state.texts, questions[i].question.text]});
                    this.setState({answers: [...this.state.answers, questions[i].question.answers]});
                }
            }
        }.bind(this);
        xhr.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/gettesttemplate", true);
        xhr.send(JSON.stringify({"ID": this.state.id + this.state.language}));
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