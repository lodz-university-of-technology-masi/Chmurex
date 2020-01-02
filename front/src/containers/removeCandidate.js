import React from "react";

import "./listCandidates.css"
class RemoveCandidate extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="removeCandidate">
               <p>
                    Czy na pewno chcesz usunąć {this.props.location.state.clickedUser} ?
               </p>
            </div>
            );
    }

}
    
export default RemoveCandidate