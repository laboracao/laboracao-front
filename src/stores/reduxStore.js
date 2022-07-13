import { createStore, combineReducers } from 'redux';

const loadingContext = false;

function loadReducer(state = loadingContext, action){
    switch (action.type){
        case 'SET_LOADING':
            state = action.loading;
            return state;
        default:
            return state;
    }
}

export default createStore(combineReducers({
    load: loadReducer,
}));