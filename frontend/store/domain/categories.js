import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"


const categoriesEvents = {




    ADD_CATEGORY_STARTED:"categories/events/ADD_CATEGORY_STARTED",
    ADD_CATEGORY_FAILED:"categories/events/ADD_CATEGORY_FAILED",
    ADD_CATEGORY_SUCCEEDED:"categories/events/ADD_CATEGORY_SUCCEEDED",


    UPDATE_CATEGORY_STARTED:"categories/events/UPDATE_CATEGORY_STARTED",
    UPDATE_CATEGORY_FAILED:"categories/events/UPDATE_CATEGORY_FAILED",
    UPDATE_CATEGORY_SUCCEEDED:"categories/events/UPDATE_CATEGORY_SUCCEEDED",


    DELETE_CATEGORY_STARTED:"categories/events/DELETE_CATEGORY_STARTED",
    DELETE_CATEGORY_FAILED:"categories/events/DELETE_CATEGORY_FAILED",
    DELETE_CATEGORY_SUCCEEDED:"categories/events/DELETE_CATEGORY_SUCCEEDED",




};

const categoriesDocActions = {
};

const categoriesCommands = {
   
    ADD_CATEGORY:"categories/command/ADD_CATEGORY",
    UPDATE_CATEGORY:"categories/command/UPDATE_CATEGORY",
    DELETE_CATEGORY:"categories/command/DELETE_CATEGORY",


};

const initData = {
    
};

let categoriesReducer = function(state=initData, {type, payload}){
	switch (type) {
        

	    default:{
			break;
		}
	}
	return state;
};


let categoriesSaga = function*() {


    yield takeEvery(categoriesCommands.ADD_CATEGORY, function*(action) {
        console.log(action)
        yield put({type: categoriesEvents.ADD_CATEGORY_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/api/categories`,
                method: httpMethods.POST,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: categoriesEvents.ADD_CATEGORY_FAILED,
                postSuccessAction: categoriesEvents.ADD_CATEGORY_SUCCEEDED
                
                
                
            }
        });
    });


    yield takeEvery(categoriesCommands.UPDATE_CATEGORY, function*(action) {
        let categoryID = action.payload.data._id;
        delete action.payload.data._id;
        yield put({type: categoriesEvents.UPDATE_CATEGORY_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/api/categories/${categoryID}`,
                method: httpMethods.PUT,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: categoriesEvents.UPDATE_CATEGORY_FAILED,
                postSuccessAction: categoriesEvents.UPDATE_CATEGORY_SUCCEEDED



            }
        });
    });

    yield takeEvery(categoriesCommands.DELETE_CATEGORY, function*(action) {
        let categoryID = action.payload.data._id;
        yield put({type: categoriesEvents.DELETE_CATEGORY_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/api/categories/${categoryID}`,
                method: httpMethods.DELETE,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: categoriesEvents.DELETE_CATEGORY_FAILED,
                postSuccessAction: categoriesEvents.DELETE_CATEGORY_SUCCEEDED



            }
        });
    });


}




export {
    categoriesEvents,
    categoriesDocActions,
    categoriesCommands,
    categoriesReducer,
    categoriesSaga
}
