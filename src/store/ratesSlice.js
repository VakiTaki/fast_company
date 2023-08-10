import { createSlice } from "@reduxjs/toolkit";

const ratesSlice = createSlice({
   name: "rates",
   initialState: { entities: [], isLoaded: false },
   reducers: {
      addRates(state, action) {
         state.entities = action.payload;
         state.isLoaded = true;
      }
   }
});

const { reducer: ratesReducer, actions } = ratesSlice;
const { addRates } = actions;

export const addRateList = () => (dispatch, getState) => {
   // if (getState().rates.isLoaded) return;
   const users = getState().users.entities;
   let rateList = {};
   users.forEach(u => {
      const rateArray = [];
      users.forEach(element => {
         element.rates?.forEach(rate => { if (rate.userId === u._id) { rateArray.push(rate.rate); } });
      });
      if (rateArray.length > 0) rateList = { ...rateList, [u._id]: (rateArray.reduce((sum, current) => sum + current, 0) / rateArray.length).toFixed(1) };
   });

   dispatch(addRates(rateList));
};

export const getRateForId = (id) => (state) => state.rates.entities[id] ? state.rates.entities[id] : 0;

export default ratesReducer;
