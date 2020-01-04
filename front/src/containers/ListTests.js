import React from "react";
import { Button } from "react-bootstrap";

class ListTests extends React.Component {
    constructor(props) {
        super(props);
    }

    createNewTest() {
        this.props.history.push("/recruiter/tests/newtesttemplate");
    }

    render() {
        return (
            <div className="ListTests">
                <h1>
                    Test list
                </h1>

                <Button onClick={() => this.createNewTest()}>
                    Create a new test
                </Button>
            </div>
        );
    }
}

export default ListTests