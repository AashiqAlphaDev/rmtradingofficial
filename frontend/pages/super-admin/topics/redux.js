/**
 * Created by aashiq on 17/08/18.
 */
import {put, takeEvery} from 'redux-saga/effects'
import _ from "underscore"
import {linkEvents} from "../../../store/domain/links";
import {topicEvents} from "../../../store/domain/topics";

let listeners = []

const superTopicsUiEvents = {

};

const superTopicsUiDocActions = {


};

const initData = {
    centers:[],
    query:""
};

let superTopicsUiReducer = function(state=initData, {type, payload}){
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

let superTopicsUiSaga = function*() {
    yield takeEvery(topicEvents.ADD_TOPIC_SUCCEEDED, delegate);

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
    superTopicsUiDocActions,
    superTopicsUiEvents,
    superTopicsUiReducer,
    superTopicsUiSaga,
    removeListener,
    addListener
}
