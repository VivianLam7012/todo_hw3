import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { updateNewList} from '../../store/database/asynchHandler'

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { bool: false };
      }
    handleNewList = () => {
        let object = {
            "name": "Unknown",
            "owner": "Unknown",
            "items": []
        }
        // this.props.todoLists.push(object);

        const { props, state } = this;
        const { firebase } = props;
        const todoList = { ...state };

        
        props.registerNewList(this.props.todoLists, firebase, object, this.props.history);
        // this.props.history.push('/todoList/4Fkrk1mtGxStuxZPMU2O');
        this.setState({bool:true});
        
        // return <Redirect to="/todoList/:id" />;
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        else if (this.state.bool) {
            this.setState({bool:false})
            // return <Link to = "/addItemScreen"
            // return <Redirect to={'/todoList/BBrNpfeiQNbZ5Ckc1Ebn' } />
            // return <Redirect to='/addItemScreen' />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = dispatch => ({
    registerNewList: (todoList, firebase, object, history) => dispatch(updateNewList(todoList, firebase, object, history)),
  });

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);