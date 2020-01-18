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
                    Are you sure you want to remove {this.props.location.state.email} {this.props.location.state.email} ?
               </h1>
               <Button type="button"  onClick={() => {
                                        this.handleRemove(this.props.location.state.email);
                                    }
                                        }>
                    Remove
               </Button>
               <Button type="button"  onClick={() => {
                                        this.goBack();
                                    }
                                        }>
                    Cancel
               </Button>
            </div>
            );
    }

    handleRemove(user){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/removecandidate",true);
        xhr.onload = function () {
            
        };
        xhr.send('{"user":"'+ user +'"}');
        this.goBack();
    }

    goBack(){
        this.props.history.push("/recruiter/listCandidates");
    }
}
    
export default RemoveCandidate