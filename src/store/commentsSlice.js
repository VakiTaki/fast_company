import { createSlice } from "@reduxjs/toolkit";
import commentsService from "../service/comment.service";
import localStorageServise from "../service/localStorage.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
   name: "comments",
   initialState: { entities: [], isLoading: true, error: null, isDataLoaded: false },
   reducers: {
      commentsRequested(state) {
         state.entities = [];
         state.isLoading = true;
      },
      commentsReceved(state, action) {
         state.entities = action.payload.sort(
            (a, b) => parseFloat(b.created_at) - parseFloat(a.created_at)
         );
         state.isLoading = false;
         state.isDataLoaded = true;
      },
      commentsRequestFiled(state, action) {
         state.error = action.payload;
         state.isLoading = false;
      },
      createdComment(state, action) {
         state.entities.unshift(action.payload);
      },
      removedComment(state, action) {
         state.entities = state.entities.filter((comment) => comment._id !== action.payload);
      }
   }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { createdComment, removedComment, commentsReceved, commentsRequested, commentsRequestFiled } = actions;

export const loadCommentsList = (pageId) => async (dispatch, getState) => {
   dispatch(commentsRequested());
   try {
      const { content } = await commentsService.getComments(pageId);
      dispatch(commentsReceved(content));
   } catch (error) {
      dispatch(commentsRequestFiled(error.message));
   }
};
export const createComment = (data) => async (dispatch) => {
   const comment = {
      ...data,
      _id: nanoid(),
      created_at: Date.now(),
      userId: localStorageServise.getUserId()
   };
   try {
      const { content } = await commentsService.createComment(comment);
      dispatch(createdComment(comment));
      return content;
   } catch (error) {
      dispatch(commentsRequestFiled(error.message));
   }
};
export const removeComment = (id) => async (dispatch, getState) => {
   try {
      const { content } = await commentsService.removeComment(id);
      dispatch(removedComment(id));
      console.log(getState(0).comments.entities);
      return content;
   } catch (error) {
      dispatch(commentsRequestFiled(error.message));
   }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;
export const getIsDataLoaded = () => (state) => state.comments.isDataLoaded;

export default commentsReducer;
