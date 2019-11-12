// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';

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
        this.setState({due_date: event.target.value});
    }

    handleCompletedChange = (event) => {
        this.setState({completed: event.target.checked});
    }

    handleSubmit = () => {
        const newItem = {
            key: this.props.list.items.length,
            description: this.state.description,
            assigned_to: this.state.assigned_to,
            due_date: this.state.due_date,
            completed: this.state.completed
        }
        console.log(newItem);
        this.props.buildAddNewItemTransaction(newItem);
    }

    handleCancel = () => {
        this.props.goToListCallback(this.props.list);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\tItemScreen render");

        return (
            <div id="todo_item">
                <h3 id="item_heading">Item</h3>

                <div id="item_form_container">
                    <div id="item_description_prompt" className="item_prompt">Description:</div>
                    <input id="item_description_textfield" className="item_input" type="input" onChange={this.handleDescriptionChange}  />
                    <div id="item_assigned_to_prompt" className="item_prompt">Assigned To:</div>
                    <input id="item_assigned_to_textfield" className="item_input" type="input" onChange={this.handleAssignedToChange}  />
                    <div id="item_due_date_prompt" className="item_prompt">Due Date:</div>
                    <input id="item_due_date_picker" className="item_input" type="date" onChange={this.handleDueDateChange} />
                    <div id="item_completed_prompt" className="item_prompt">Completed:</div>
                    <input id="item_completed_checkbox" className="form_checkbox" type="checkbox" onChange={this.handleCompletedChange} />
                </div>
                <button id="item_form_submit_button" className="item_button" onClick={this.handleSubmit}>Submit</button>
                <button id="item_form_cancel_button" className="item_button" onClick={this.handleCancel}>Cancel</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
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