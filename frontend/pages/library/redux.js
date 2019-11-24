/**
 * Created by aashiq on 17/08/18.
 */
import {put, takeEvery} from 'redux-saga/effects'
import _ from "underscore"
import {topicEvents} from "../../store/domain/topics";
import {authEvents} from "../../store/domain/auth";


let listeners = []

const libraryUiEvents = {

};

const libraryUiDocActions = {


};

const initData = {
};

let libraryUiReducer = function(state=initData, {type, payload}){
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

let libraryUiSaga = function*() {
    yield takeEvery(topicEvents.FETCH_TOPIC_SUCCEEDED, delegate);
    yield takeEvery(authEvents.USER_LOGOUT_STARTED, delegate);



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
    libraryUiDocActions,
    libraryUiEvents,
    libraryUiReducer,
    libraryUiSaga,

    removeListener,
    addListener
}
