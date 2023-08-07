import { createSlice } from "@reduxjs/toolkit";
import userService from "../service/user.service";
import authService from "../service/auth.service";
import localStorageServise from "../service/localStorage.service";

const qualitiesSlice = createSlice({
   name: "users",
   initialState: { entities: null, isLoading: true, error: null, auth: null, isLoggedIn: false },
   reducers: {
      usersRequested(state) {
         state.isLoading = true;
      },
      usersReceved(state, action) {
         state.entities = action.payload;
         state.lastFetch = Date.now();
         state.isLoading = false;
      },
      usersRequestFiled(state, action) {
         state.error = action.payload;
         state.isLoading = false;
      },
      authRequestSuccess(state, action) {
         state.auth = { ...action.payload, isLoggedIn: true };
      },
      authRequestFiled(state, action) {
         state.error = action.payload;
      }

   }
});

const { reducer: usersReducer, actions } = qualitiesSlice;
const { usersRequested, usersReceved, usersRequestFiled, authRequestSuccess, authRequestFiled } = actions;

export const signUp = ({ email, password, ...rest }) => async (dispath) => {
   try {
      const data = await authService.register({ email, password });
      localStorageServise.setTokens({ userId: data.localId });
      dispath(authRequestSuccess(data));
   } catch (error) {
      dispath(authRequestFiled(error.message));
   }
};
export const loadUserList = () => async (dispatch) => {
   dispatch(usersRequested());
   try {
      const { content } = await userService.get();
      dispatch(usersReceved(content));
   } catch (error) {
      dispatch(usersRequestFiled(error.message));
   }
};

export const getUsers = () => (state) => state.users.entities;
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;
export const getUserById = (id) => (state) => {
   if (state.users.entities) {
      return state.users.entities.find((q) => q._id === id);
   }
};

export default usersReducer;
