import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);

const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

export const persistor = persistStore(store);
