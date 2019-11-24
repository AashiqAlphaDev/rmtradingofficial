/**
 * Created by aashiq on 17/08/18.
 */
import {put, takeEvery} from 'redux-saga/effects'
import _ from "underscore"
import {authEvents} from "../../../store/domain/auth";

let listeners = []

const userUiEvents = {

};

const userUiDocActions = {


};

const initData = {
    centers:[],
    query:""
};

let userAuthUiReducer = function(state=initData, {type, payload}){
    switch (type) {
        default:{
            break;
        }
    }
    return state;
};

let delegate = function*(action){
    listeners.forEach(function(listener){
        if(listener.onAction){
            listener.onAction.call(listener,action);
        }
    });
}

let userAuthUiSaga = function*() {
    yield takeEvery(authEvents.USER_LOGIN_SUCCEEDED, delegate);
    
    

};


let addListener = (listener)=>{
    listeners.push(listener);
}

let removeListener = (listener)=>{
    listeners = _.reject(listeners, function (item) {
        return listener===item;
    });
}

export {
    userUiDocActions,
    userUiEvents,
    userAuthUiReducer,
    userAuthUiSaga,




    removeListener,
    addListener
}
