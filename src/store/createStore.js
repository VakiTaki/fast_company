import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualitiesSlice";
import professionsReducer from "./professionsSlice";
import usersReducer from "./usersSlice";
import commentsReducer from "./commentsSlice";
import ratesReducer from "./ratesSlice";

const rootReducer = combineReducers({ qualities: qualitiesReducer, professions: professionsReducer, users: usersReducer, comments: commentsReducer, rates: ratesReducer });

export function createStore() {
   return configureStore({
      reducer: rootReducer

   });
};
