import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {authReducer,authSaga} from "./domain/auth";
import {appSaga} from "./app/saga";
import {vaccinationCenterReducer, vaccinationCenterSaga} from "./domain/vaccination-center";
import {userReducer, userSaga} from "./domain/user";
import {petReducer, petSaga} from "./domain/pet";
import {visitReducer, visitSaga} from "./domain/visit";
import {vaccinationReducer, vaccinationSaga} from "./domain/vaccination";
import {appointmentReducer, appointmentSaga} from "./domain/appointments";
import {homeUiReducer, homeUiSaga} from "../pages/redux";
import {vaccineReducer, vaccineSaga} from "./domain/vaccines";
import {petTypeReducer, petTypeSaga} from "./domain/pet-types";
import {claimReducer, claimSaga} from "./domain/claim";
import {tokenReducer, tokenSaga} from "./domain/token";
import {userAuthUiReducer, userAuthUiSaga} from "../pages/auth/login/redux";
import {registerUiReducer, registerUiSaga} from "../pages/auth/register/redux";
import {topicReducer, topicSaga} from "./domain/topics";
import {categoriesReducer, categoriesSaga} from "./domain/categories";
import {collectionReducer, collectionSaga} from "./domain/collections";
import {linkReducer, linkSaga} from "./domain/links";
import {libraryUiReducer, libraryUiSaga} from "../pages/library/redux";
import {superTopicsUiReducer, superTopicsUiSaga} from "../pages/super-admin/topics/redux";
import {superCollectionsUiReducer, superCollectionsUiSaga} from "../pages/super-admin/collections/redux";
import {superCategoriesUiReducer, superCategoriesUiSaga} from "../pages/super-admin/categories/redux";
import {superLinksUiReducer, superLinksUiSaga} from "../pages/super-admin/link/redux";
import {bookmarkReducer, bookmarkSaga} from "./domain/bookmark";
import {contentPageUiReducer, contentPageUiSaga} from "../pages/content-page/redux";
import {collectionsPageUiReducer, collectionsPageUiSaga} from "../pages/collections/redux";


const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export default (initialState)=>{
	const sagaMiddleware = createSagaMiddleware();
	const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
	let store = createStore(combineReducers({
		ui:combineReducers({
            home:homeUiReducer,
			user:userAuthUiReducer,
			register:registerUiReducer,
			library: libraryUiReducer,
			superTopic: superTopicsUiReducer,
			superCollection: superCollectionsUiReducer,
			superCategory: superCategoriesUiReducer,
			superLink: superLinksUiReducer,
			contentPage: contentPageUiReducer,
			collectionPage: collectionsPageUiReducer






		}),



		auth:authReducer,
		claim:claimReducer,
		vaccines:vaccineReducer,
        topics:topicReducer,
        collections:collectionReducer,
        links:linkReducer,
        categories:categoriesReducer,
		user:userReducer,
		pet:petReducer,
		visit:visitReducer,
		vaccination:vaccinationReducer,
		vaccinationCenter:vaccinationCenterReducer,
		appointments:appointmentReducer,
		petTypes:petTypeReducer,
		token:tokenReducer,
		bookmarks:bookmarkReducer





	}), initialState, enhancer);
	sagaMiddleware.run(authSaga);
	sagaMiddleware.run(contentPageUiSaga);
	sagaMiddleware.run(collectionsPageUiSaga);
	sagaMiddleware.run(bookmarkSaga);
	sagaMiddleware.run(registerUiSaga);
	sagaMiddleware.run(libraryUiSaga,);
	sagaMiddleware.run(claimSaga);
	sagaMiddleware.run(userAuthUiSaga);
	sagaMiddleware.run(topicSaga);
	sagaMiddleware.run(categoriesSaga);
	sagaMiddleware.run(collectionSaga);
	sagaMiddleware.run(linkSaga);
	sagaMiddleware.run(superTopicsUiSaga);
	sagaMiddleware.run(superCollectionsUiSaga);
	sagaMiddleware.run(superLinksUiSaga);
	sagaMiddleware.run(superCategoriesUiSaga);
	sagaMiddleware.run(tokenSaga);
	sagaMiddleware.run(vaccineSaga);
	sagaMiddleware.run(petTypeSaga);
    sagaMiddleware.run(userSaga);
    sagaMiddleware.run(petSaga);
    sagaMiddleware.run(visitSaga);
    sagaMiddleware.run(appointmentSaga);
    sagaMiddleware.run(vaccinationSaga);
    sagaMiddleware.run(vaccinationCenterSaga);
	sagaMiddleware.run(appSaga);

    sagaMiddleware.run(homeUiSaga);
	return store;



};



