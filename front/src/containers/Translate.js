import React from "react";
import {Button, Form, FormControl, FormGroup, InputGroup} from "react-bootstrap";

class Translate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (this.props.location.search).slice(4, this.props.location.search.length - 2),
            language: (this.props.location.search).slice(this.props.location.search.length - 2),
            body: '',
            loaded: true
        };
    }

    handleSubmit(event){
        event.preventDefault();
        let req = new XMLHttpRequest();
        req.open('POST', 'https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/translatetesttemplate', false);
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if(req.status === 200){
                    this.state.body = JSON.parse(req.responseText).body
                    console.log(this.state.body);
                }
                else
                    console.log("Błąd podczas ładowania strony\n");
            }
        }.bind(this);
        req.send('{"ID":"'+ this.state.id + this.state.language + '"}');
        console.log('{"ID":"'+ this.state.id + "PL"   + '","JSON":' + this.state.body + '}');
        this.addTest(event);

    }

    addTest(event){
        let lang;
        if(this.state.language === "EN"){
            lang = "PL"
        }
        else{
            lang = "EN"
        }
        event.preventDefault();
        let req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                console.log(req.responseText);
                if (JSON.parse(req.responseText).statusCode === 400) {
                    alert("Test already exists in database");
                } else {
                    alert("Successfully saved new test template");
                    this.props.history.push("/recruiter/tests");
                }
            }
        }.bind(this);
        console.log((this.state.body));
        req.open('POST', 'https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/newtesttemplate', false);
        req.send(JSON.stringify({"ID":this.state.id + lang, "JSON":this.state.body}));
    }

    render() {
        if (!this.state.loaded) {
            return (
                <div className="Translate">
                    <h1>Loading ...</h1>
                </div>
            );
        } else {
            return (
                <div className="Translate">
                    <h1>Translate test</h1>
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <Button onClick={this.props.history.goBack} style={{display: "inline-block", backgroundColor: "#00C3ED", color: "#FFFFFF", fontWeight: "bold"}}>
                            Back
                        </Button>
                        <Button type="submit" style={{display: "inline-block", backgroundColor: "#00C3ED", color: "#FFFFFF", fontWeight: "bold"}}>
                            Submit
                        </Button>
                    </Form>
                </div>
            );
        }
    }
}

export default Translate