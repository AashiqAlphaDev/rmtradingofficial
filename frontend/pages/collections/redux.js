/**
 * Created by aashiq on 17/08/18.
 */
import {put, takeEvery} from 'redux-saga/effects'
import _ from "underscore"
import {bookmarkEvents} from "../../store/domain/bookmark";

let listeners = []

const collectionsPageUiEvents = {

};

const collectionsPageUiDocActions = {


};

const initData = {
    centers:[],
    query:""
};

let collectionsPageUiReducer = function(state=initData, {type, payload}){
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

let collectionsPageUiSaga = function*() {
    yield takeEvery(bookmarkEvents.ADD_BOOKMARK_SUCCEEDED, delegate);

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
    collectionsPageUiDocActions,
    collectionsPageUiEvents,
    collectionsPageUiReducer,
    collectionsPageUiSaga,
    removeListener,
    addListener
}
