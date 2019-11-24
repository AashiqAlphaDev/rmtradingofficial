import {put, takeEvery, takeLatest} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const userEvents = {
    ADD_USER_STARTED: "USER/events/ADD_USER_STARTED",
    ADD_USER_SUCCEEDED: "USER/events/ADD_USER_SUCCEEDED",
    ADD_USER_FAILED: "USER/events/ADD_USER_FAILED",

    FETCH_USER_STARTED:"USER/events/FETCH_USER_STARTED",
    FETCH_USER_FAILED:"USER/events/FETCH_USER_FAILED",
    FETCH_USER_SUCCEEDED:"USER/events/FETCH_USER_SUCCEEDED",

    FETCH_USERS_STARTED:"USER/events/FETCH_USERS_STARTED",
    FETCH_USERS_FAILED:"USER/events/FETCH_USERS_FAILED",
    FETCH_USERS_SUCCEEDED:"USER/events/FETCH_USERS_SUCCEEDED",
    CLEAR_FETCH_USERS:"USER/events/CLEAR_FETCH_USERS",

};

const userDocActions = {
    SET_USERS:"USER/command/SET_USERS"
};

const userCommands = {
    ADD_USER: "USER/command/ADD_USER",
    FETCH_USER:"USER/command/FETCH_USER",
    FETCH_USERS:"USER/command/FETCH_USERS"
};

const initData = {
    users:{}
};

let userReducer = function(state=initData, {type, payload}){
	switch (type) {
        case userDocActions.SET_USERS:{
            payload.forEach((user)=>{
                state = {...state, users:{...state.users, [user._id]:user}}
            });
            break;

        }
	    default:{
			break;
		}
	}
	return state;
};


let userSaga = function*() {
    yield takeEvery(userCommands.ADD_USER, function* (action) {
        console.log(action)
        yield put({type:userEvents.ADD_USER_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/api/auth/register`,
                method: httpMethods.POST,
				body:action.payload.data,
            },
            meta: {
                callbackId:action.payload.callbackId,
                postFailureAction: userEvents.ADD_USER_FAILED,
                postSuccessAction: userEvents.ADD_USER_SUCCEEDED
            }
        });
    });
    yield takeEvery(userCommands.FETCH_USER, function* (action) {
        yield put({type:userEvents.FETCH_USER_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/users`,
                method: httpMethods.GET
            },
            meta: {
                callbackId:action.payload.callbackId,
                postFailureAction: userEvents.FETCH_USER_FAILED,
                postSuccessAction: userEvents.FETCH_USER_SUCCEEDED,
                onSuccess:function*(payload){
                    yield put({type:userDocActions.SET_USERS, payload:payload.data});
                }
            }
        });
    });


	yield takeLatest(userCommands.FETCH_USERS, function* (action) {
	    yield put({type:userEvents.FETCH_USERS_STARTED});
		yield put({
			type: appActions.API,
			payload: {
				url: `/users/?q=${action.payload.query}`,
				method: httpMethods.GET
			},
			meta: {
				callbackId:action.payload.callbackId,
				postFailureAction: userEvents.FETCH_USERS_FAILED,
				onSuccess:function*(payload){
					yield put({type:userDocActions.SET_USERS, payload:payload.docs});
					yield put({type:userEvents.FETCH_USERS_SUCCEEDED, payload:_.map(payload.docs, (item)=>{return item._id})})
				}
			}
		});
	});

};







export {
    userEvents,
    userDocActions,
    userCommands,
    userReducer,
    userSaga
}
