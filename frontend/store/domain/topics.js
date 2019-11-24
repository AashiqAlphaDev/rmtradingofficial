import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"
import fetch from "isomorphic-fetch";
import base_url from "../base_url";


const topicEvents = {




    ADD_TOPIC_STARTED:"topics/events/ADD_TOPIC_STARTED",
    ADD_TOPIC_FAILED:"topics/events/ADD_TOPIC_FAILED",
    ADD_TOPIC_SUCCEEDED:"topics/events/ADD_TOPIC_SUCCEEDED",


    DELETE_TOPIC_STARTED:"topics/events/DELETE_TOPIC_FAILED",
    DELETE_TOPIC_FAILED:"topics/events/DELETE_TOPIC_FAILED",
    DELETE_TOPIC_SUCCEEDED:"topics/events/DELETE_TOPIC_SUCCEEDED",



    FETCH_TOPIC_STARTED:"topics/events/FETCH_TOPIC_STARTED",
    FETCH_TOPIC_FAILED:"topics/events/FETCH_TOPIC_FAILED",
    FETCH_TOPIC_SUCCEEDED:"topics/events/FETCH_TOPIC_SUCCEEDED",




};

const topicDocActions = {
};

const topicCommands = {
   
    ADD_TOPIC:"topics/command/ADD_TOPIC",
    FETCH_TOPIC:"topics/command/FETCH_TOPIC",
    DELETE_TOPIC:"topics/command/DELETE_TOPIC",


};

const initData = {
    
};

let topicReducer = function(state=initData, {type, payload}){
	switch (type) {
        

	    default:{
			break;
		}
	}
	return state;
};


let topicSaga = function*() {


    yield takeEvery(topicCommands.ADD_TOPIC, function*(action) {
        console.log(action)
        yield put({type: topicEvents.ADD_TOPIC_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/api/topics`,
                method: httpMethods.POST,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: topicEvents.ADD_TOPIC_FAILED,
                postSuccessAction: topicEvents.ADD_TOPIC_SUCCEEDED



            }
        });
    });
    yield takeEvery(topicCommands.DELETE_TOPIC, function*(action) {
        console.log("inside command",action.payload)
        yield put({type: topicEvents.DELETE_TOPIC_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/api/topics/${action.payload.data._id}`,
                method: httpMethods.DELETE
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: topicEvents.DELETE_TOPIC_FAILED,
                postSuccessAction: topicEvents.DELETE_TOPIC_SUCCEEDED
            }
        });
    });



    yield takeEvery(topicCommands.FETCH_TOPIC, function*(action) {
        console.log(action)
        yield put({type: topicEvents.FETCH_TOPIC_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/api/topics/${action.payload.topic_id}`,
                method: httpMethods.GET
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: topicEvents.FETCH_TOPIC_FAILED,
                postSuccessAction: topicEvents.FETCH_TOPIC_SUCCEEDED
            }
        });
    });



















}




export {
    topicEvents,
    topicDocActions,
    topicCommands,
    topicReducer,
    topicSaga
}
