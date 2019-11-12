import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { updateHandlerName } from '../../store/database/asynchHandler';
import { updateHandlerOwner } from '../../store/database/asynchHandler';
import { updateSorting } from '../../store/database/asynchHandler';
import { updateDelete } from '../../store/database/asynchHandler';

import { Modal, Button } from 'react-materialize';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }
    //console.log(props);
    handleChangeName = (e) => {
        e.preventDefault();
        const { target } = e;
        
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        let newName = e.target.value;

        const { props, state } = this;
        const { firebase } = props;
        const todoList = { ...state };
        props.registerName(this.props.todoList, firebase, newName);

    }

    handleChangeOwner = (e) => {
        e.preventDefault();

        const { target } = e;
        
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        let newOwner = e.target.value;

        const { props, state } = this;
        const { firebase } = props;
        const todoList = { ...state };
        props.registerOwner(this.props.todoList, firebase, newOwner);

    }
    showDialog = () => {
        var object = this.refs.modal_yes_no_dialog;  
        object.classList.add("is_visible");
    }

    hideDialog = () => {
    var object = this.refs.modal_yes_no_dialog;  
    object.classList.toggle("is_visible");
    }

    removeList = (listToRemove) => {
        console.log(listToRemove)
        console.log(this.props.todoLists)
        const { props, state } = this;
        const { firebase } = props;
        props.registerDelete(this.props.todoLists, firebase, listToRemove);

        this.props.history.push('/:any');
        
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if(!todoList) {
            return <React.Fragment />
        }

        return (
            <div className="container white">
                <div>
                    <Button href="#modal1" className="modal-trigger">Show Modal</Button>
                    <Modal id="modal1" header="Modal Header" >
                                Lorem ipsum dolor sit amet
                    </Modal>
                </div>
                <div className="modal" id="modal_yes_no_dialog" ref="modal_yes_no_dialog" data-animation="slideInOutLeft">
                    <div className="modal_dialog">
                        <header className="dialog_header">
                            Delete list?
                        </header>
                        <section className="dialog_content">
                            <p><strong>Are you sure you want to delete this list?</strong></p>
                        </section>
                            <button id="dialog_yes_button" onClick = {() => this.removeList(this.props.todoList)} >Yes</button>
                            <button id="dialog_no_button" onClick = {() => this.hideDialog()}>No</button>
                        <footer className="dialog_footer">
                            The list will not be retreivable.
                        </footer>
                    </div>
                </div>

                <div className = "todoListHeader">
                    <h4 className="grey-text text-darken-3">Todo List</h4>
                </div>
                <div className = 'trashCan'onClick = {() =>this.showDialog()}>
                    <a class="btn-floating btn-large waves-effect waves-light teal lighten-1"><i class="material-icons left" >delete</i> </a>           
                </div>
                <div className="input-field">
                    <input input type="text" name="name" id="name" onChange={this.handleChangeName} defaultValue={todoList.name}/>
                    <label class="active" htmlFor="email">Name</label>
                    {/* <label htmlFor="email">Name</label> */}
                    {/* <input type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} /> */}
                </div>
                <div className="input-field">
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChangeOwner} defaultValue={todoList.owner} />
                    <label class = "active" htmlFor="password">Owner</label>
                </div>
                <ItemsList todoList={todoList} todoLists = {this.props.todoLists} />

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const id= ownProps.match.params.id;
  const todoLists  = state.firestore.data.todoLists;
  const todoList = todoLists ? todoLists[id] : null;

  if (todoList) {
      todoList.id = id;
  }
//   console.log(id)
//   console.log(todoLists)
//   console.log(todoList)
//   todoList.id = id;

  return {
    todoList, todoLists,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => ({
    registerName: (todoList, firebase, newName) => dispatch(updateHandlerName(todoList, firebase, newName)),
    registerOwner: (todoList, firebase, newOwner) => dispatch(updateHandlerOwner(todoList, firebase, newOwner)),
    registerDelete: (todoList, firebase, listToRemove) => dispatch(updateDelete(todoList, firebase, listToRemove)),

  });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);