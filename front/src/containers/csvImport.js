import React from "react";
import {Button} from "react-bootstrap";
import CSVReader from 'react-csv-reader'
class CsvImport extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:'',
        }
        this.fileLoaded = this.fileLoaded.bind(this);
    }
    render() {
        return (
            <div className="CsvImport">
               <h1>
                    Import test template from csvv file
               </h1>
               <CSVReader onFileLoaded={this.fileLoaded} />
               <p>{this.state.data}</p>
            </div>
            );
    }

    fileLoaded(data) {
        this.setState({data:data})
    }
}

export default CsvImport