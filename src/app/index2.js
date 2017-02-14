import React from "react";
import {render} from "react-dom";

import {Provider} from "react-redux";
import {createStore,combineReducers,applyMiddleware} from "redux";
import logger from "redux-logger";

import App from "./components/App";


const mathReducer = (state = {result : 0, lastValues : []}, action) => {  //math reducer handles multiple actions
        switch(action.type){
            case "ADD" : state = {
                ...state,
                result : state.result + action.payLoad,
                lastValues : [...state.lastValues,action.payLoad]
            }
            break;
            case "SUBTRACT" : state = {
                 ...state,
                result : state.result - action.payLoad,
                lastValues : [...state.lastValues,action.payLoad]
            }
            break ;
        }
        return state;
};

const userReducer = (state = {name : "Ashwin", age : 27}, action) => {  //userReducer handles state of user
        switch(action.type){
            case "SET_NAME" : state = {
                ...state,
                name : action.payLoad
            }
            break;
            case "SET_AGE" : state = {
                 ...state,
                age : action.payLoad
            }
            break ;
        }
        return state;
};

const myLogger = (store) => (next) => (action) =>{
    console.log("Logged Action : ", action);
    next(action);
}

const store = createStore(combineReducers({math : mathReducer, user : userReducer}),{},applyMiddleware(logger()));

store.subscribe(() =>{
   // console.log("Store Updated !!",store.getState());
});

// store.dispatch({
//     type : "SET_NAME",
//     payLoad : "Siddhesh"
// });

// store.dispatch({
//     type : "ADD",
//     payLoad : 50
// });


render(
    <Provider store = {store}>
        <App />
    </Provider>
    ,document.getElementById("App")
    );









