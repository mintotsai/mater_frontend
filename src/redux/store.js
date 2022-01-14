// https://medium.com/@montezsmith/how-to-setup-redux-react-router-571adfde4f23
// https://github.com/gothinkster/react-redux-realworld-example-app/blob/9186292054dc37567e707602a15a0884d6bdae35/src/store.js
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension'
// import thunk from 'redux-thunk'
import rootReducer from './reducers';

// const middleware = applyMiddleware(thunk)


const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(thunkMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(thunkMiddleware, createLogger)
  }
};

// const store = createStore(rootReducer, composeWithDevTools(middleware))
const store = createStore(rootReducer, getMiddleware())

export default store;