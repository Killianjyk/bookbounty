import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookSearch: "",
    userSearch: "",
}

export const SearchSlice = createSlice({
  name: "searchField",
  initialState, // initialState: initialState if you have a property and its the same as the variable, you can cut out the property name.
  reducers: {
    reset: (state) => {
        state.bookSearch = ""; // or state.value = initialState.value;
        state.userSearch = "";
    },
    searchBooks: (state, action) => {
        state.bookSearch = action.payload;
    },
    searchUsers: (state, action) => {
        state.userSearch = action.payload;
    }
  }
});
export const { reset, searchBooks, searchUsers } = SearchSlice.actions
export default SearchSlice.reducer;
