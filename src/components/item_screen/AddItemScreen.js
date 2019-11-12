// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { DatePicker, TextInput, Checkbox } from 'react-materialize';


class AddItemScreen extends Component {
    constructor(props) {
        super(props);

        // DISPLAY WHERE WE ARE
        console.log("\tItemScreen constructor");

        this.state = {
            description: "",
            assigned_to: "",
            due_date: "",
            completed: ""
        }
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }

    handleAssignedToChange = (event) => {
        this.setState({assigned_to: event.target.value});
    }

    handleDueDateChange = (event) => {
        console.log(event.value)
        this.setState({due_date: event});
    }

    handleCompletedChange = (event) => {
        this.setState({completed: event.target.checked});
    }

    handleSubmit = () => {
        const newItem = {
            // key: this.props.todoList.items.length,
            description: this.state.description,
            assigned_to: this.state.assigned_to,
            due_date: this.state.due_date,
            completed: this.state.completed
        }
        console.log(newItem);
        // this.props.buildAddNewItemTransaction(newItem);
    }

    handleCancel = () => {
        return this.props.history.goBack();
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\tItemScreen render");

        return (
            <div id="todo_item"  className="container white">
            
                <h5 id="item_heading">ADD ITEM SCREEN</h5>

                <div id="item_form_container">
                    <TextInput label="Description" onChange={this.handleDescriptionChange} />
                    <TextInput label="Assigned To" onChange={this.handleAssignedToChange}/>
                    <DatePicker label ="Due Date"  onChange={this.handleDueDateChange}/>
                    <Checkbox value="Red" label="Completed" onChange={this.handleCompletedChange}/>
                </div>
                    <button class="waves-effect waves-green btn-flat modal-close " onClick={this.handleSubmit}>Submit</button>
                    <button class="waves-effect waves-green btn-flat modal-close" onClick={this.handleCancel}>Cancel</button>

                {/* <button id="item_form_submit_button" className="item_button" onClick={this.handleSubmit}>Submit</button>
                <button id="item_form_cancel_button" className="item_button" onClick={this.handleCancel}>Cancel</button> */}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        todoLists: state.firestore.ordered.todoLists, 
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(AddItemScreen);