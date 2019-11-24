import {put, takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";

const authEvents = {








    USER_LOGIN_STARTED:"auth/events/USER_LOGIN_STARTED",
    USER_LOGIN_SUCCEEDED:"auth/events/USER_LOGIN_SUCCEEDED",
    USER_LOGIN_FAILED:"auth/events/USER_LOGIN_FAILED",

    USER_LOGOUT_STARTED:"auth/events/USER_LOGOUT_STARTED",
    USER_LOGOUT_SUCCEEDED:"auth/events/USER_LOGOUT_SUCCEEDED",
    USER_LOGOUT_FAILED:"auth/events/USER_LOGOUT_FAILED",

    SUPER_ADMIN_LOGIN_STARTED:"auth/events/SUPER_ADMIN_LOGIN_STARTED",
    SUPER_ADMIN_LOGIN_SUCCEEDED:"auth/events/SUPER_ADMIN_LOGIN_SUCCEEDED",
    SUPER_ADMIN_LOGIN_FAILED:"auth/events/SUPER_ADMIN_LOGIN_FAILED"







};

const authDocActions = {

};

const authCommands = {
	USER_LOGIN:"auth/commands/USER_LOGIN",
	USER_LOGOUT:"auth/commands/USER_LOGOUT",
    SUPER_ADMIN_LOGIN:"auth/commands/SUPER_ADMIN_LOGIN"
};

const initData = {
	current_user:{
		is_logged_in:false,
		is_admin:false,
		is_super_admin:false,
		vet_center_id:null
	}
};

let authReducer = function(state=initData, {type}){
	switch (type) {
		default:{
			break;
		}
	}
	return state;
};


let authSaga = function*() {
;
    yield takeEvery(authCommands.SUPER_ADMIN_LOGIN, function*(action) {
        yield put({type:authEvents.SUPER_ADMIN_LOGIN_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: '/super-admin/login',
                method: httpMethods.POST,
                body: action.payload
            },
            meta: {
                postFailureAction: authEvents.SUPER_ADMIN_LOGIN_FAILED,
                postSuccessAction: authEvents.SUPER_ADMIN_LOGIN_SUCCEEDED,
                onSuccess:function*(payload){
                    if(typeof window === 'object'){
                        document.cookie = `session_id=${payload.session_id};path=/`
                    }
                }
            }
        });
    });


    yield takeEvery(authCommands.USER_LOGIN, function*(action) {
        yield put({type:authEvents.USER_LOGIN_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: '/api/auth/login',
                method: httpMethods.POST,
                body: action.payload.data
            },
            meta: {
                callbackId:action.payload.callbackId,
                postFailureAction: authEvents.USER_LOGIN_FAILED,
                postSuccessAction: authEvents.USER_LOGIN_SUCCEEDED,
                onSuccess:function*(payload){
                    if(typeof window === 'object'){
                        document.cookie = `session_id=${payload.session_id};path=/`
                    }
                }
            }
        });
    });


    yield takeEvery(authCommands.USER_LOGOUT, function*() {
        yield put({type:authEvents.USER_LOGOUT_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: '/logout',
                method: httpMethods.DELETE,
            },
            meta: {
                postFailureAction: authEvents.USER_LOGOUT_FAILED,
                postSuccessAction: authEvents.USER_LOGOUT_SUCCEEDED,
                onSuccess:function*(){
                    if(typeof window === 'object'){
                        document.cookie = `session_id=;path=/`
                    }
                }
            }
        });
    });

};

export {
	authEvents,
	authDocActions,
	authCommands,
	authReducer,
	authSaga
}
