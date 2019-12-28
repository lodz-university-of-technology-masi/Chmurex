import React from "react"

class NewTestTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: '', json: '', mode: 'open'};

        this.handleChangeMode = this.handleChangeMode.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeMode(event) {
        this.setState({mode: event.target.value});
    }

    handleChangeId(event) {
        this.setState({id: event.target.value});
    }

    handleSubmit() {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://lrjyi691l7.execute-api.us-east-1.amazonaws.com/Prod/recruiter/newtesttemplate');
        xhr.send(JSON.stringify({"ID": this.state.id, "JSON": this.state.json}));
    }

    renderOpenForm() {
        if (this.state.mode === 'open') {
            return (
                <output>open placeholder</output>
            );
        } else {
            return null;
        }
    }

    renderChoiceForm() {
        if (this.state.mode === 'choice') {
            return (
                <output>choice placeholder</output>
            );
        } else {
            return null;
        }
    }

    renderNumericForm() {
        if (this.state.mode === 'numeric') {
            return (
                <output>numeric placeholder</output>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="NewTestTemplate">
                <h1>Create test</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Test type:
                            <select value={this.state.mode} onChange={this.handleChangeMode}>
                                <option value='open'>Open</option>
                                <option value='choice'>Choice</option>
                                <option value='numeric'>Numeric</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Test ID:
                            <input type="text" value={this.state.id} onChange={this.handleChangeId}/>
                        </label>
                    </div>
                    <div>
                        {this.renderOpenForm()}
                        {this.renderChoiceForm()}
                        {this.renderNumericForm()}
                    </div>
                    <div>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewTestTemplate