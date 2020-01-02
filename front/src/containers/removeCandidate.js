import React from "react";
import {Button} from "react-bootstrap";
import "./listCandidates.css"
class RemoveCandidate extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="removeCandidate">
               <h1>
                    Are you sure you want to remove {this.props.location.state.sub} {this.props.location.state.email} ?
               </h1>
               <Button type="button">
                    Remove
               </Button>
            </div>
            );
    }

}
    
export default RemoveCandidate