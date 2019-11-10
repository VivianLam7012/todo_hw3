import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { updateHandlerName } from '../../store/database/asynchHandler';
import { updateHandlerOwner } from '../../store/database/asynchHandler';
import { updateSorting } from '../../store/database/asynchHandler';


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

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <div className = "todoListHeader">
                    <h4 className="grey-text text-darken-3">Todo List</h4>
                </div>
                <div className = 'trashCan'>
                    <a class="btn-floating btn-large waves-effect waves-light teal lighten-1"><i class="material-icons left" >delete_sweep</i> </a>           
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
                <ItemsList todoList={todoList} />

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const id= ownProps.match.params.id;
  const todoLists  = state.firestore.data.todoLists;
  const todoList = todoLists ? todoLists[id] : null;

  console.log(id)
  console.log(todoLists)
  console.log(todoList)
  todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => ({
    registerName: (todoList, firebase, newName) => dispatch(updateHandlerName(todoList, firebase, newName)),
    registerOwner: (todoList, firebase, newOwner) => dispatch(updateHandlerOwner(todoList, firebase, newOwner)),
  });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);