// https://medium.com/@montezsmith/how-to-setup-redux-react-router-571adfde4f23
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import thunk from 'redux-thunk'
import rootReducer from './reducers';

// const middleware = applyMiddleware(thunk)

// const store = createStore(rootReducer, composeWithDevTools(middleware))
const store = createStore(rootReducer, applyMiddleware(logger))

export default store;