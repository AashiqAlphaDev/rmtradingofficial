import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"


const linkEvents = {

    ADD_LINK_STARTED:"links/events/ADD_LINK_STARTED",
    ADD_LINK_FAILED:"links/events/ADD_LINK_FAILED",
    ADD_LINK_SUCCEEDED:"links/events/ADD_LINK_SUCCEEDED",




};

const linkDocActions = {
};

const linkCommands = {
   
    ADD_LINK:"links/command/ADD_LINK",
	

};

const initData = {
    
};

let linkReducer = function(state=initData, {type, payload}){
	switch (type) {
        

	    default:{
			break;
		}
	}
	return state;
};


let linkSaga = function*() {


    yield takeEvery(linkCommands.ADD_LINK, function*(action) {
        console.log(action)
        yield put({type: linkEvents.ADD_LINK_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/api/links`,
                method: httpMethods.POST,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: linkEvents.ADD_LINK_FAILED,
                postSuccessAction: linkEvents.ADD_LINK_SUCCEEDED
                
                
                
            }
        });
    });













}




export {
    linkEvents,
    linkDocActions,
    linkCommands,
    linkReducer,
    linkSaga
}
