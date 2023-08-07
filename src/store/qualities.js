import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../service/quality.service";

const qualitiesSlice = createSlice({
   name: "qualities",
   initialState: { entities: null, isLoading: true, error: null },
   reducers: {
      qualitiesRequested(state) {
         state.isLoading = true;
      },
      qualitiesReceved(state, action) {
         state.entities = action.payload;
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

export const loadQualitiesList = () => async (dispatch) => {
   dispatch(qualitiesRequested());
   try {
      const { content } = await qualityService.get();
      dispatch(qualitiesReceved(content));
   } catch (error) {
      dispatch(qualitiesRequestFiled(error.message));
   }
};
export const getQialities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;
export const getQialityById = (id) => (state) => {
   return state.qualities.entities.find((q) => q._id === id);
};

export default qualitiesReducer;
