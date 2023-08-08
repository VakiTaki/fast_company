import { createSlice } from "@reduxjs/toolkit";
import userService from "../service/user.service";
import authService from "../service/auth.service";
import localStorageServise from "../service/localStorage.service";
import history from "../utils/histoty";
import { generateAuthErrors } from "../utils/generateAuthErrors";

const initialState = localStorageServise.getUserId()
   ? { entities: [], isLoading: true, error: null, auth: null, isLoggedIn: true, isDataLoaded: false }
   : { entities: [], isLoading: true, error: null, auth: null, isLoggedIn: false, isDataLoaded: false };

const qualitiesSlice = createSlice({
   name: "users",
   initialState,
   reducers: {
      usersRequested(state) {
         state.isLoading = true;
      },
      usersReceved(state, action) {
         state.entities = action.payload;
         state.lastFetch = Date.now();
         state.isDataLoaded = true;
         state.isLoading = false;
      },
      usersRequestFiled(state, action) {
         state.error = action.payload;
         state.isLoading = false;
      },
      authRequestSuccess(state, action) {
         state.auth = action.payload;
         state.isLoggedIn = true;
         state.error = null;
      },
      authRequestFiled(state, action) {
         state.error = action.payload;
         state.isLoggedIn = false;
      },
      createdUser(state, action) {
         state.entities.push(action.payload);
      },
      createUserRequested(state) {
         state.isLoading = false;
      },
      createUserFiled(state, action) {
         state.error = action.payload;
         state.isLoading = false;
      },
      logOuted(state) {
         state.entities = [];
         state.isLoggedIn = false;
         state.isDataLoaded = false;
         state.auth = null;
      },
      editedUser(state, action) {
         const index = state.entities.findIndex(user => user._id === action.payload._id);
         state.entities[index] = action.payload;
      }
   }
});

const { reducer: usersReducer, actions } = qualitiesSlice;
const { usersRequested, usersReceved, usersRequestFiled, authRequestSuccess, authRequestFiled, createUserRequested, createUserFiled, createdUser, logOuted, editedUser } = actions;

export const signIn = ({ email, password, ...rest }, redirect) => async (dispath) => {
   try {
      const data = await authService.login({ email, password });
      localStorageServise.setTokens(data);
      dispath(authRequestSuccess(data));
      history.push(redirect);
   } catch (error) {
      const errorMessage = generateAuthErrors(error.response.data.error);
      errorMessage ? dispath(authRequestFiled(errorMessage)) : dispath(authRequestFiled(error.message));
   }
};
export const signUp = ({ email, password, ...rest }) => async (dispath) => {
   try {
      const data = await authService.register({ email, password });
      localStorageServise.setTokens(data);
      dispath(authRequestSuccess(data));
      dispath(createUser({
         _id: data.localId,
         email,
         image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
         )
            .toString(36)
            .substring(7)}.svg`,
         ...rest
      }));
   } catch (error) {
      const errorMessage = generateAuthErrors(error.response.data.error);
      errorMessage ? dispath(authRequestFiled(errorMessage)) : dispath(authRequestFiled(error.message));
   }
};
export const logOut = () => (dispatch) => {
   dispatch(logOuted());
   localStorageServise.removeAuthData();
   history.push("/");
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
const createUser = (data) => async (dispatch) => {
   dispatch(createUserRequested());
   try {
      const { content } = await userService.create(data);
      console.log(content);
      dispatch(createdUser(data));
      history.push("/users");
   } catch (error) {
      dispatch(createUserFiled(error.message));
   }
};
export const editUser = (data) => async (dispatch) => {
   try {
      const { content } = await userService.create(data);
      dispatch(editedUser(data));
      console.log(content);
      history.push(`/users/${data._id}`);
      return content;
   } catch (error) {
      dispatch(createUserFiled(error.message));
   };
};

export const isDataLoaded = () => (state) => state.users.isDataLoaded;
export const isLoggedIn = () => (state) => state.users.isLoggedIn;
export const getUsers = () => (state) => state.users.entities;
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;
export const getUserById = (id) => (state) => {
   if (state.users.entities) {
      return state.users.entities.find((q) => q._id === id);
   }
};
export const getUsersError = () => (state) => state.users.error;

export default usersReducer;
