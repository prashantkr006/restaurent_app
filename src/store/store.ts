import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import rootReducer from './reducers';

const middleware = getDefaultMiddleware({
  serializableCheck: false, // Disable SerializableStateInvariantMiddleware
  immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
});

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
