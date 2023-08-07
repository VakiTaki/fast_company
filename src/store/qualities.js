import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../service/quality.service";
import { isOutDate } from "../utils/isOutDate";

const qualitiesSlice = createSlice({
   name: "qualities",
   initialState: { entities: null, isLoading: true, error: null, lastFetch: null },
   reducers: {
      qualitiesRequested(state) {
         state.isLoading = true;
      },
      qualitiesReceved(state, action) {
         state.entities = action.payload;
         state.lastFetch = Date.now();
         state.isLoading = false;
      },
      qualitiesRequestFiled(state, action) {
         state.error = action.payload;
         state.isLoading = false;
      }
   }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFiled } = actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
   const { lastFetch } = getState().qualities;
   if (isOutDate(lastFetch)) {
      dispatch(qualitiesRequested());
      try {
         const { content } = await qualityService.get();
         dispatch(qualitiesReceved(content));
      } catch (error) {
         dispatch(qualitiesRequestFiled(error.message));
      }
   };
};

export const getQialities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;
export const getQialityById = (id) => (state) => {
   if (state.users.entities) {
      return state.qualities.entities.find((q) => q._id === id);
   }
};

export default qualitiesReducer;
