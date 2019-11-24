/**
 * Created by aashiq on 17/08/18.
 */
import {put, takeEvery} from 'redux-saga/effects'
import _ from "underscore"
import {categoriesEvents as categoryEvents} from "../../../store/domain/categories";
import {linkEvents} from "../../../store/domain/links";

let listeners = []

const superLinksUiEvents = {

};

const superLinksUiDocActions = {


};

const initData = {
    centers:[],
    query:""
};

let superLinksUiReducer = function(state=initData, {type, payload}){
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

let superLinksUiSaga = function*() {
    yield takeEvery(linkEvents.ADD_LINK_SUCCEEDED, delegate);

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
    superLinksUiDocActions,
    superLinksUiEvents,
    superLinksUiReducer,
    superLinksUiSaga,
    removeListener,
    addListener
}
