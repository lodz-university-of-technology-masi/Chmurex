import React from "react";
import { Button } from "react-bootstrap";

class ListTests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tests: []};

        this.getTests();
    }

    getTests() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let body = JSON.parse(xhr.responseText).body;
                this.setState({tests: JSON.parse(body).tests});
            }
        }.bind(this);
        xhr.open("GET", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/gettesttemplates", true);
        xhr.send();
    }

    handleUpdateTest(i) {
        this.props.history.push("/recruiter/tests/updatetest?id=" + this.state.tests[i]);
    }

    handleDeleteTest(i) {
        let xhr = new XMLHttpRequest();
        let self = this;
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                self.getTests();
                alert("Successfully deleted test template");
            }
        };
        xhr.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/removetesttemplate", true);
        xhr.send(JSON.stringify({"ID": this.state.tests[i]}));
    }

    createNewTest() {
        this.props.history.push("/recruiter/tests/newtesttemplate");
    }

    renderTable() {
        let rows = [];
        for (let i = 0; i < this.state.tests.length; i++) {
            rows.push(
                <tr key={i}>
                    <td>{this.state.tests[i]}</td>
                    <td>
                        <Button onClick={() => this.handleUpdateTest(i)}>
                            Update
                        </Button>
                    </td>
                    <td>
                        <Button onClick={() => this.handleDeleteTest(i)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        }
        return rows;
    }

    render() {
        return (
            <div className="ListTests">
                <h1>Test list</h1>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Test name</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
                <Button onClick={this.props.history.goBack}>
                    Back
                </Button>
                <Button onClick={() => this.createNewTest()}>
                    Create a new test
                </Button>
            </div>
        );
    }
}

export default ListTests