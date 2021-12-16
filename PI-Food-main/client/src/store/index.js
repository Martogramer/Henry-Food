import { createStore,applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import elReducerAtomico from '../reducer/index';

export const store = createStore(
    elReducerAtomico,
    composeWithDevTools(applyMiddleware(thunk))
);