import { connectStateResults } from "react-instantsearch-dom";

export const Results = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <div>Searching for query {searchState.query}</div>
  ) : (
    <div>No query</div>
  )
);
