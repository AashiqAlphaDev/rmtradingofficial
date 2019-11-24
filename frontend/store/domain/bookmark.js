import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"


const bookmarkEvents = {

    ADD_BOOKMARK_STARTED:"bookmarks/events/ADD_BOOKMARK_STARTED",
    ADD_BOOKMARK_FAILED:"bookmarks/events/ADD_BOOKMARK_FAILED",
    ADD_BOOKMARK_SUCCEEDED:"bookmarks/events/ADD_BOOKMARK_SUCCEEDED",




};

const bookmarkDocActions = {
};

const bookmarkCommands = {
   
    ADD_BOOKMARK:"bookmarks/command/ADD_BOOKMARK",
	

};

const initData = {
    
};

let bookmarkReducer = function(state=initData, {type, payload}){
	switch (type) {
        

	    default:{
			break;
		}
	}
	return state;
};


let bookmarkSaga = function*() {


    yield takeEvery(bookmarkCommands.ADD_BOOKMARK, function*(action) {
        console.log(action)
        yield put({type: bookmarkEvents.ADD_BOOKMARK_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/api/bookmarks`,
                method: httpMethods.POST,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: bookmarkEvents.ADD_BOOKMARK_FAILED,
                postSuccessAction: bookmarkEvents.ADD_BOOKMARK_SUCCEEDED
                
                
                
            }
        });
    });













}




export {
    bookmarkEvents,
    bookmarkDocActions,
    bookmarkCommands,
    bookmarkReducer,
    bookmarkSaga
}
