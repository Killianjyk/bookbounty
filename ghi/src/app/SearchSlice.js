import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: "",
}

export const SearchSlice = createSlice({
  name: "searchField",
  initialState, // initialState: initialState if you have a property and its the same as the variable, you can cut out the property name.
  reducers: {
    reset: (state) => {
        state.value = ""; // or state.value = initialState.value;
    },
    search: (state, action) => {
        state.value = action.payload;
    }
  }
});
export const { reset, search } = SearchSlice.actions
export default SearchSlice.reducer;
