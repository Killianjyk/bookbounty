import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
}

export const SearchSlice = createSlice({
  name: "BookSearch",
  initialState, // initialState: initialState if you have a property and its the same as the variable, you can cut out the property name.
  reducers: {
    reset: (state) => {
        state.value = null; // or state.value = initialState.value;
    },
    search: (state, action) => {
        state.value = action.payload;
    }
  }
});
export const { reset, search } = SearchSlice.actions
export default SearchSlice.reducer;
