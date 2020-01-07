import React from "react";
import { Button, Form, FormControl, FormGroup, InputGroup } from "react-bootstrap";
import CSVReader from 'react-csv-reader'

class CsvImport extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:'',
            count: 0,
            id: "",
            language:"EN",
            contents:{},
            file: false
        };
        this.fileLoaded = this.fileLoaded.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    validateID() {
        return this.state.id.length > 0 && this.state.file
    }

    handleChangeId(event) {
        this.setState({id: event.target.value});
    }

    handleChangeLanguage(event) {
        this.setState({language: event.target.value});
    }
    render() {
        return (
            <div className="CsvImport">
               <h1>
                    Import test template from csv file
               </h1>
               <CSVReader onFileLoaded={this.fileLoaded} />
               <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>Test name</InputGroup.Addon>
                            <FormControl type="text" value={this.state.id} onChange={(event) => this.handleChangeId(event)}/>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>Language</InputGroup.Addon>
                            <FormControl componentClass="select" value={this.state.language} onChange={(event) => this.handleChangeLanguage(event)}>
                                <option value="EN">English</option>
                                <option value="PL">Polish</option>
                            </FormControl>
                        </InputGroup>
                    </FormGroup>
                    <Button type="submit" disabled={!this.validateID()} style={{display: "inline-block", backgroundColor: "#00C3ED", color: "#FFFFFF", fontWeight: "bold"}}>
                        Submit
                    </Button>
                    <Button type="button" onClick={this.props.history.goBack} style={{display: "inline-block", backgroundColor: "#00C3ED", color: "#FFFFFF", fontWeight: "bold"}}>
                        Go back
                    </Button>
                </Form>

            </div>
            );
    }

    fileLoaded(data) {
       this.setState({file:true});
       this.setState({data:data});
       console.log(this.state.data);
       if(!this.validateData()){
          this.setState({data:null});
          this.setState({file:false});
          alert("Wrong csv file syntax");  
       }
    }

    validateData() {
        let data = this.state.data;
        let returned = true;
        const keys = Object.keys(data);
        for (const key in keys){
            if (data[key][1]!=="O" && data[key][1]!=="L" && data[key][1]!=="W" && data[key][1]!==""){ // type
                returned = false;
            }
        }
        
        return returned;
    }

    handleSubmit(event){
        let data = this.state.data;
        let contents = {};
        let name = "Questions" + data[0][0] + data[0][1];
        contents[name] = {"questions": []};
        const keys = Object.keys(data);
        for (const key in keys){
            if(data[key][1] !== ""){
                contents[name]["questions"].push({
                    "question": {
                        "type": data[key][1],
                        "text": data[key][2],
                        "answers": data[key][3]
                    }
                });
            }
        }
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert("Successfully saved new test template");
            }
        };
        xhr.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/newtesttemplate");
        xhr.send(JSON.stringify({"ID": this.state.id + this.state.language, "JSON": JSON.stringify(contents, null, 4)}));
    }
}

export default CsvImport