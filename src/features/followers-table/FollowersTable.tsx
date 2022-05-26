import { Paper, Input, InputLabel, Box, Card, Stack } from "@mui/material";
import {
  PagingState,
  CustomPaging,
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";
import "./followers-table.css";
import { useGetUserQuery, useGetFollowersQuery } from "../api/api-slice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useDebounce } from "../../hooks/use-debounce";
import UserCard from "../../components/user-card/UserCard";
import Loading from "../../components/loading/Loading";
import {
  currentPageSelector,
  pageSizeSelector,
  sortingSelector,
  filtersSelector,
  usernameSearchSelector,
  setCurrentPage,
  setPageSize,
  setSorting,
  setFilters,
  setUsernameSearch
} from "./followers-table-slice";
import { useSelector, useDispatch } from "react-redux";

const PAGE_SIZES = [30, 50, 80, 100];
const COLUMNS = [
  { name: "username", title: "Follower User Name" },
  { name: "id", title: "ID" }
];

export default () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(currentPageSelector);
  const pageSize = useSelector(pageSizeSelector);
  const sorting = useSelector(sortingSelector);
  const filters = useSelector(filtersSelector);
  const username = useSelector(usernameSearchSelector);

  const debouncedUsername = useDebounce(username, 600);

  const { data: user } = useGetUserQuery(debouncedUsername || skipToken);
  const {
    data: followers,
    isLoading: areFollowersLoading
  } = useGetFollowersQuery(
    debouncedUsername && user
      ? { username, currentPage: currentPage + 1, pageSize } // currentPage + 1 because table page is zero based, and github api is one based
      : skipToken
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Card sx={{ width: 200, marginBottom: 2 }}>
        <Box sx={{ p: 2 }}>
          <Stack spacing={0.5}>
            <InputLabel>Search Github User</InputLabel>
            <Input
              value={username}
              onChange={(e) => dispatch(setUsernameSearch(e.target.value))}
              type="search"
              placeholder="Enter username..."
            />
          </Stack>
        </Box>
      </Card>

      {user ? (
        <UserCard
          sx={{ marginBottom: 2 }}
          src={user.avatarUrl}
          name={user.name}
          followersCount={user.followersCount}
        />
      ) : null}
      <Grid rows={followers ?? []} columns={COLUMNS}>
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={(newPage) => dispatch(setCurrentPage(newPage))}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => dispatch(setPageSize(newPageSize))}
        />
        <CustomPaging totalCount={user?.followersCount ?? 0} />
        <SortingState
          sorting={sorting}
          onSortingChange={(newSorting) => dispatch(setSorting(newSorting))}
        />
        <IntegratedSorting />
        <FilteringState
          filters={filters}
          onFiltersChange={(newFilters) => dispatch(setFilters(newFilters))}
        />
        <IntegratedFiltering />
        <Table />
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
        <PagingPanel pageSizes={PAGE_SIZES} />
      </Grid>
      {areFollowersLoading ? <Loading /> : null}
    </Paper>
  );
};
