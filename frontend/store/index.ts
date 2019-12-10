import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./ducks/rootReducer";
import rootSaga from './ducks/rootSaga';


const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

// function configureStore (initialState = {}) {
//   const sagaMiddleware = createSagaMiddleware()
//   const store = createStore(
//     rootReducer,
//     initialState,
//     bindMiddleware([sagaMiddleware])
//   )

//   store.sagaTask = sagaMiddleware.run(rootSaga)

//   return store
// }

// export default configureStore;


export default ({ initialState } = { initialState: {} }) => {
  const sagaMiddleware = createSagaMiddleware();
  const store: any = createStore(rootReducer, initialState, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  // if (module.hot) {
  //   module.hot.accept("reducers", () => {
  //     const nextReducer = require("reducers").default;
  //     store.replaceReducer(nextReducer);
  //   });
  // }

  return store;
};

// const logger = () => (window as any).__REDUX_DEVTOOLS_EXTENSION__
//   ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
//   : (x) => x