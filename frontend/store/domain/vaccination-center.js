import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const vaccinationCenterEvents = {

    UPDATE_VACCINATION_CENTER_STARTED:"vaccinationCenters/events/UPDATE_VACCINATION_CENTER_STARTED",
    UPDATE_VACCINATION_CENTER_FAILED:"vaccinationCenters/events/UPDATE_VACCINATION_CENTER_FAILED",
    UPDATE_VACCINATION_CENTER_SUCCEEDED:"vaccinationCenters/events/UPDATE_VACCINATION_CENTER_SUCCEEDED",

    DELETE_VACCINATION_CENTER_QUEUE_STARTED:"vaccinationCenters/events/DELETE_VACCINATION_CENTER_QUEUE_STARTED",
    DELETE_VACCINATION_CENTER_QUEUE_FAILED:"vaccinationCenters/events/DELETE_VACCINATION_CENTER_QUEUE_FAILED",
    DELETE_VACCINATION_CENTER_QUEUE_SUCCEEDED:"vaccinationCenters/events/DELETE_VACCINATION_CENTER_QUEUE_SUCCEEDED",

    ADD_VACCINATION_CENTER_QUEUE_STARTED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_QUEUE_STARTED",
    ADD_VACCINATION_CENTER_QUEUE_FAILED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_QUEUE_FAILED",
    ADD_VACCINATION_CENTER_QUEUE_SUCCEEDED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_QUEUE_SUCCEEDED",

    DELETE_VACCINATION_CENTER_QUEUE_SLOT_STARTED:"vaccinationCenters/events/DELETE_VACCINATION_CENTER_QUEUE_SLOT_STARTED",
    DELETE_VACCINATION_CENTER_QUEUE_SLOT_FAILED:"vaccinationCenters/events/DELETE_VACCINATION_CENTER_QUEUE_SLOT_FAILED",
    DELETE_VACCINATION_CENTER_QUEUE_SLOT_SUCCEEDED:"vaccinationCenters/events/DELETE_VACCINATION_CENTER_QUEUE_SLOT_SUCCEEDED",

    ADD_VACCINATION_CENTER_QUEUE_SLOT_STARTED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_QUEUE_SLOT_STARTED",
    ADD_VACCINATION_CENTER_QUEUE_SLOT_FAILED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_QUEUE_SLOT_FAILED",
    ADD_VACCINATION_CENTER_QUEUE_SLOT_SUCCEEDED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_QUEUE_SLOT_SUCCEEDED",

    FETCH_VACCINATION_CENTER_STARTED:"vaccinationCenters/events/FETCH_VACCINATION_CENTER_STARTED",
    FETCH_VACCINATION_CENTER_FAILED:"vaccinationCenters/events/FETCH_VACCINATION_CENTER_FAILED",
    FETCH_VACCINATION_CENTER_SUCCEEDED:"vaccinationCenters/events/FETCH_VACCINATION_CENTER_SUCCEEDED",

    ADD_VACCINATION_CENTER_STARTED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_STARTED",
    ADD_VACCINATION_CENTER_FAILED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_FAILED",
    ADD_VACCINATION_CENTER_SUCCEEDED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_SUCCEEDED",

    DELETE_VACCINATION_CENTER_STARTED:"vaccinationCenters/events/DELETE_VACCINATION_CENTER_STARTED",
    DELETE_VACCINATION_CENTER_FAILED:"vaccinationCenters/events/DELETE_VACCINATION_CENTER_FAILED",
    DELETE_VACCINATION_CENTER_SUCCEEDED:"vaccinationCenters/events/DELETE_VACCINATION_CENTER_SUCCEEDED",


    ADD_VACCINATION_CENTER_ADMIN_STARTED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_ADMIN_STARTED",
    ADD_VACCINATION_CENTER_ADMIN_FAILED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_ADMIN_FAILED",
    ADD_VACCINATION_CENTER_ADMIN_SUCCEEDED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_ADMIN_SUCCEEDED",

    FETCH_VACCINATION_CENTERS_STARTED:"vaccinationCenters/events/FETCH_VACCINATION_CENTERS_STARTED",
    FETCH_VACCINATION_CENTERS_FAILED:"vaccinationCenters/events/FETCH_VACCINATION_CENTERS_FAILED",
    FETCH_VACCINATION_CENTERS_SUCCEEDED:"vaccinationCenters/events/FETCH_VACCINATION_CENTERS_SUCCEEDED",
    CLEAR_FETCH_VACCINATION_CENTERS:"guardian/events/CLEAR_FETCH_VACCINATION_CENTERS"



};

const vaccinationCenterDocActions = {

    SET_CENTERS:"vaccinationCenters/command/SET_CENTERS"

};

const vaccinationCenterCommands = {
    DELETE_VACCINATION_CENTER:"vaccinationCenters/command/DELETE_VACCINATION_CENTER",
	UPDATE_VACCINATION_CENTER:"vaccinationCenters/command/UPDATE_VACCINATION_CENTER",
    ADD_VACCINATION_CENTER:"vaccinationCenters/command/ADD_VACCINATION_CENTER",
	DELETE_VACCINATION_CENTER_QUEUE:"vaccinationCenters/command/DELETE_VACCINATION_CENTER_QUEUE",
	ADD_VACCINATION_CENTER_QUEUE:"vaccinationCenters/command/ADD_VACCINATION_CENTER_QUEUE",
    ADD_VACCINATION_CENTER_QUEUE_SLOT:"vaccinationCenters/command/ADD_VACCINATION_CENTER_QUEUE_SLOT",
    DELETE_VACCINATION_CENTER_QUEUE_SLOT:"vaccinationCenters/command/DELETE_VACCINATION_CENTER_QUEUE_SLOT",
    FETCH_VACCINATION_CENTER:"vaccinationCenters/command/FETCH_VACCINATION_CENTER",
    ADD_VACCINATION_CENTER_ADMIN:"vaccinationCenters/command/ADD_VACCINATION_CENTER_ADMIN",
    FETCH_VACCINATION_CENTERS:"vaccinationCenters/command/FETCH_VACCINATION_CENTERS"

};

const initData = {
    vaccinationCenters:{}
};

let vaccinationCenterReducer = function(state=initData, {type, payload}){
	switch (type) {
        case vaccinationCenterDocActions.SET_CENTERS: {
            payload.forEach((center) => {
                state = {...state, vaccinationCentersResult: {...state.vaccinationCenters, [vaccinationCenter._id]: center}}
            });
            break;
        }

	    default:{
			break;
		}
	}
	return state;
};


let vaccinationCenterSaga = function*() {


    yield takeEvery(vaccinationCenterCommands.FETCH_VACCINATION_CENTER, function* (action) {
        yield put({type:vaccinationCenterEvents.FETCH_VACCINATION_CENTER_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/${action.payload.vaccination_center_id}`,
                method: httpMethods.GET
            },
            meta: {
                callbackId:action.payload.callbackId,
                postFailureAction: vaccinationCenterEvents.FETCH_VACCINATION_CENTER_FAILED,
                postSuccessAction: vaccinationCenterEvents.FETCH_VACCINATION_CENTER_SUCCEEDED,
                onSuccess:function*(payload){
                    yield put({type:vaccinationCenterDocActions.SET_CENTERS, payload:payload.data});
                }
            }
        });
    });





    yield takeLatest(vaccinationCenterCommands.FETCH_VACCINATION_CENTERS, function* (action) {
        yield put({type:vaccinationCenterEvents.FETCH_VACCINATION_CENTERS_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/?q=${action.payload.query}`,
                method: httpMethods.GET
            },
            meta: {
                callbackId:action.payload.callbackId,
                postFailureAction: vaccinationCenterEvents.FETCH_VACCINATION_CENTERS_FAILED,
                postSuccessAction: vaccinationCenterEvents.FETCH_VACCINATION_CENTERS_SUCCEEDED,
                onSuccess:function*(payload){
                    yield put({type:vaccinationCenterDocActions.SET_CENTERS, payload:payload.data});
                }
            }
        });
    });







    yield takeEvery(vaccinationCenterCommands.UPDATE_VACCINATION_CENTER, function*(action) {
        console.log(action)
        yield put({type: vaccinationCenterEvents.UPDATE_VACCINATION_CENTER_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/:vaccination_center_id`,
                method: httpMethods.PUT,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccinationCenterEvents.UPDATE_VACCINATION_CENTER_FAILED,
                postSuccessAction: vaccinationCenterEvents.UPDATE_VACCINATION_CENTER_SUCCEEDED
            }
        });
    });

    yield takeEvery(vaccinationCenterCommands.ADD_VACCINATION_CENTER, function*(action) {
        console.log(action)
        yield put({type: vaccinationCenterEvents.ADD_VACCINATION_CENTER_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers`,
                method: httpMethods.POST,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccinationCenterEvents.ADD_VACCINATION_CENTER_FAILED,
                postSuccessAction: vaccinationCenterEvents.ADD_VACCINATION_CENTER_SUCCEEDED
            }
        });
    });

    yield takeEvery(vaccinationCenterCommands.ADD_VACCINATION_CENTER_ADMIN, function*(action) {
        console.log(action)
        yield put({type: vaccinationCenterEvents.ADD_VACCINATION_CENTER_ADMIN_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/${action.payload.center_id}/admins`,
                method: httpMethods.POST,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccinationCenterEvents.ADD_VACCINATION_CENTER_ADMIN_FAILED,
                postSuccessAction: vaccinationCenterEvents.ADD_VACCINATION_CENTER_ADMIN_SUCCEEDED
            }
        });
    });








    yield takeEvery(vaccinationCenterCommands.DELETE_VACCINATION_CENTER, function*(action) {
        console.log(action)
        yield put({type: vaccinationCenterEvents.DELETE_VACCINATION_CENTER_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/${action.payload.data}`,
                method: httpMethods.DELETE
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccinationCenterEvents.DELETE_VACCINATION_CENTER_FAILED,
                postSuccessAction: vaccinationCenterEvents.DELETE_VACCINATION_CENTER_SUCCEEDED
            }
        });
    });


    yield takeEvery(vaccinationCenterCommands.DELETE_VACCINATION_CENTER_QUEUE, function*(action) {
        console.log(action)
        yield put({type: vaccinationCenterEvents.DELETE_VACCINATION_CENTER_QUEUE_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/${action.payload.center_id}`,
                method: httpMethods.PUT,
                body: {$pull: {queues: {_id: action.payload.queue_id}}},
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccinationCenterEvents.DELETE_VACCINATION_CENTER_QUEUE_FAILED,
                postSuccessAction: vaccinationCenterEvents.DELETE_VACCINATION_CENTER_QUEUE_SUCCEEDED
            }
        });
    });




    yield takeEvery(vaccinationCenterCommands.ADD_VACCINATION_CENTER_QUEUE, function*(action) {
        console.log(action)
        yield put({type: vaccinationCenterEvents.ADD_VACCINATION_CENTER_QUEUE_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/${action.payload.center_id}`,
                method: httpMethods.PUT,
                body: {$push: {queues: action.payload.data}},
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccinationCenterEvents.ADD_VACCINATION_CENTER_QUEUE_FAILED,
                postSuccessAction: vaccinationCenterEvents.ADD_VACCINATION_CENTER_QUEUE_SUCCEEDED
            }
        });
    });




    yield takeEvery(vaccinationCenterCommands.ADD_VACCINATION_CENTER_QUEUE_SLOT, function*(action) {
        yield put({type: vaccinationCenterEvents.ADD_VACCINATION_CENTER_QUEUE_SLOT_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/${action.payload.center_id}/queues/${action.payload.queue_id}`,
                method: httpMethods.PUT,
                body: {$push: {"queues.$.time_slots": action.payload.slot_data}},
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccinationCenterEvents.ADD_VACCINATION_CENTER_QUEUE_SLOT_FAILED,
                postSuccessAction: vaccinationCenterEvents.ADD_VACCINATION_CENTER_QUEUE_SLOT_SUCCEEDED
            }
        });
    });

    yield takeEvery(vaccinationCenterCommands.DELETE_VACCINATION_CENTER_QUEUE_SLOT, function*(action) {
        yield put({type: vaccinationCenterEvents.DELETE_VACCINATION_CENTER_QUEUE_SLOT_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/${action.payload.center_id}/queues/${action.payload.queue_id}`,
                method: httpMethods.PUT,
                body: {$pull: {"queues.$.time_slots": {_id: action.payload.slot_id}}}
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccinationCenterEvents.DELETE_VACCINATION_CENTER_QUEUE_SLOT_FAILED,
                postSuccessAction: vaccinationCenterEvents.DELETE_VACCINATION_CENTER_QUEUE_SLOT_SUCCEEDED
            }
        });
    });








}




export {
    vaccinationCenterEvents,
    vaccinationCenterDocActions,
    vaccinationCenterCommands,
    vaccinationCenterReducer,
    vaccinationCenterSaga
}
