import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};

export const updateHandlerName = (todoList, firebase, newName) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(todoList.id).update({name: newName});
};

export const updateHandlerOwner = (todoList, firebase, newName) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(todoList.id).update({owner: newName});
};

export const updateSorting = (todoList, firebase, items) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(todoList.id).update({items: items});
};

export const updateNewList = (todoList, firebase, object) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  // todoList.push(object);

  // console.log(todoList);
  // console.log(todoList.props);
  // console.log(firestore.collection("todoLists").doc("todoLists").update({todoLists: todoLists}))
  // console.log(firestore.collection("todoLists").doc('UNZi62rAt6dIsWig1m8S'));
  // firestore.collection("todoLists").doc('UNZi62rAt6dIsWig1m8S').update({todoLists: todoList});

  firestore.collection("todoLists").add(object);

};
