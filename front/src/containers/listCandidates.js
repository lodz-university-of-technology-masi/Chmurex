import React from "react";

class ListCandidates extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        this.getCandidates();
        return (
            <div className="ListCandidates">
                <h1>
                    Candidate List
                </h1>
            </div>
            );
    }

    getCandidates() {
        console.log('getCandidates');
        let req = new XMLHttpRequest();
        req.open('GET', 'https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/getcandidates', true);
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if(req.status == 200)
                    console.log(req.responseText);
                else
                    console.log("Błąd podczas ładowania strony\n");
            }
        };
        req.send(null);


    }
}

export default ListCandidates