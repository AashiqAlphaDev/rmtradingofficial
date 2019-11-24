/**
 * Created by aashiq on 17/08/18.
 */
import {put, takeEvery} from 'redux-saga/effects'
import _ from "underscore"
import {categoriesEvents as categoryEvents} from "../../../store/domain/categories";
import {collectionEvents} from "../../../store/domain/collections";

let listeners = []

const superCollectionsUiEvents = {

};

const superCollectionsUiDocActions = {


};

const initData = {
    centers:[],
    query:""
};

let superCollectionsUiReducer = function(state=initData, {type, payload}){
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

let superCollectionsUiSaga = function*() {
    yield takeEvery(collectionEvents.ADD_COLLECTION_SUCCEEDED, delegate);

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
    superCollectionsUiDocActions,
    superCollectionsUiEvents,
    superCollectionsUiReducer,
    superCollectionsUiSaga,
    removeListener,
    addListener
}
