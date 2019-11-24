/**
 * Created by aashiq on 17/08/18.
 */
import {put, takeEvery} from 'redux-saga/effects'
import _ from "underscore"
import {userEvents} from "../../../store/domain/user";
import {categoriesEvents as categoryEvents} from "../../../store/domain/categories";

let listeners = []

const superCategoriesUiEvents = {

};

const superCategoriesUiDocActions = {


};

const initData = {
    centers:[],
    query:""
};

let superCategoriesUiReducer = function(state=initData, {type, payload}){
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

let superCategoriesUiSaga = function*() {
    yield takeEvery(categoryEvents.ADD_CATEGORY_SUCCEEDED, delegate);
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
    superCategoriesUiDocActions,
    superCategoriesUiEvents,
    superCategoriesUiReducer,
    superCategoriesUiSaga,
    removeListener,
    addListener
}
