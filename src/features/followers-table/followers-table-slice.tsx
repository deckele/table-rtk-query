import { Sorting, Filter } from "@devexpress/dx-react-grid";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

export const followersTableSlice = createSlice({
  name: "followersTable",
  initialState: {
    currentPage: 0,
    pageSize: 30,
    sorting: [
      {
        columnName: "username",
        direction: "asc"
      }
    ] as Sorting[],
    filters: [] as Filter[],
    usernameSearch: ""
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setUsernameSearch: (state, action) => {
      state.usernameSearch = action.payload;
    }
  }
});

// Actions
export const {
  setCurrentPage,
  setPageSize,
  setSorting,
  setFilters,
  setUsernameSearch
} = followersTableSlice.actions;

// Selectors
export const currentPageSelector = (state: RootState) =>
  state.followersTable.currentPage;
export const pageSizeSelector = (state: RootState) =>
  state.followersTable.pageSize;
export const sortingSelector = (state: RootState) =>
  state.followersTable.sorting;
export const filtersSelector = (state: RootState) =>
  state.followersTable.filters;
export const usernameSearchSelector = (state: RootState) =>
  state.followersTable.usernameSearch;

// Reducer
export default followersTableSlice.reducer;
