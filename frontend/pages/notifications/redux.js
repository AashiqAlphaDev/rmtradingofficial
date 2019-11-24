/**
 * Created by aashiq on 17/08/18.
 */
import {put, takeEvery} from 'redux-saga/effects'
import _ from "underscore"
import {userEvents} from "../../store/domain/user";

let listeners = []

const registerUiEvents = {

};

const registerUiDocActions = {


};

const initData = {
    centers:[],
    query:""
};

let registerUiReducer = function(state=initData, {type, payload}){
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

let registerUiSaga = function*() {

    yield takeEvery(userEvents.ADD_USER_SUCCEEDED, delegate);

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
    registerUiDocActions,
    registerUiEvents,
    registerUiReducer,
    registerUiSaga,
    removeListener,
    addListener
}
