import { createStore, combineReducers, applyMiddleware } from 'redux';
import tasksReducer from './reducers/tasksReducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    tasks: tasksReducer
})

// function storeConfig () {
//     return createStore(reducers, applyMiddleware(thunk));
// }

export default reducers;