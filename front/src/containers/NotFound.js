import React from "react";
import { Button } from "react-bootstrap";
import "./NotFound.css";

class NotFound extends React.Component {
    render() {
        return (
            <div className="NotFound">
                <h3>Sorry, page not found!</h3>
                <Button onClick={this.props.history.goBack}>
                    Back
                </Button>
            </div>
        );
    }
}

export default NotFound