import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"


const collectionEvents = {

    ADD_COLLECTION_STARTED:"collections/events/ADD_COLLECTION_STARTED",
    ADD_COLLECTION_FAILED:"collections/events/ADD_COLLECTION_FAILED",
    ADD_COLLECTION_SUCCEEDED:"collections/events/ADD_COLLECTION_SUCCEEDED",

    UPDATE_COLLECTION_STARTED:"collections/command/UPDATE_COLLECTION_STARTED",
    UPDATE_COLLECTION_FAILED:"collections/command/UPDATE_COLLECTION_FAILED",
    UPDATE_COLLECTION_SUCCEEDED:"collections/command/UPDATE_COLLECTION_SUCCEEDED",


    FETCH_COLLECTION_STARTED:"collections/command/FETCH_COLLECTION_STARTED",
    FETCH_COLLECTION_FAILED:"collections/command/FETCH_COLLECTION_FAILED",
    FETCH_COLLECTION_SUCCEEDED:"collections/command/FETCH_COLLECTION_SUCCEEDED",


    DELETE_COLLECTION_STARTED:"collections/command/DELETE_COLLECTION_STARTED",
    DELETE_COLLECTION_FAILED:"collections/command/DELETE_COLLECTION_FAILED",
    DELETE_COLLECTION_SUCCEEDED:"collections/command/DELETE_COLLECTION_SUCCEEDED",








};

const collectionDocActions = {
};

const collectionCommands = {


    UPDATE_COLLECTION:"collections/command/UPDATE_COLLECTION",

    ADD_COLLECTION:"collections/command/ADD_COLLECTION",

    DELETE_COLLECTION:"collections/command/DELETE_COLLECTION",


	

};

const initData = {
    
};

let collectionReducer = function(state=initData, {type, payload}){
	switch (type) {
        

	    default:{
			break;
		}
	}
	return state;
};


let collectionSaga = function*() {


    yield takeEvery(collectionCommands.ADD_COLLECTION, function*(action) {
        console.log(action)
        yield put({type: collectionEvents.ADD_COLLECTION_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/api/collections`,
                method: httpMethods.POST,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: collectionEvents.ADD_COLLECTION_FAILED,
                postSuccessAction: collectionEvents.ADD_COLLECTION_SUCCEEDED
            }
        });
    });


    yield takeEvery(collectionCommands.UPDATE_COLLECTION, function*(action) {
        let collectionID = action.payload.data._id;
        delete action.payload.data._id;
        yield put({type: collectionEvents.UPDATE_COLLECTION_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/api/collections/${collectionID}`,
                method: httpMethods.PUT,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: collectionEvents.UPDATE_COLLECTION_FAILED,
                postSuccessAction: collectionEvents.UPDATE_COLLECTION_SUCCEEDED
            }
        });
    });


    yield takeEvery(collectionCommands.FETCH_COLLECTION, function*(action) {
        console.log(action)
        yield put({type: collectionEvents.FETCH_COLLECTION_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/api/collections`,
                method: httpMethods.GET,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: collectionEvents.FETCH_COLLECTION_FAILED,
                postSuccessAction: collectionEvents.FETCH_COLLECTION_SUCCEEDED
            }
        });
    });


    yield takeEvery(collectionCommands.DELETE_COLLECTION, function*(action) {
        console.log(action)
        yield put({type: collectionEvents.DELETE_COLLECTION_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/api/collections`,
                method: httpMethods.DELETE,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: collectionEvents.DELETE_COLLECTION_FAILED,
                postSuccessAction: collectionEvents.DELETE_COLLECTION_SUCCEEDED
            }
        });
    });


}




export {
    collectionEvents,
    collectionDocActions,
    collectionCommands,
    collectionReducer,
    collectionSaga
}
