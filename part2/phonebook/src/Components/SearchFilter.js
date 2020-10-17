import React from "react";

const SearchFilter = ({ filter, handleNewFilter }) => (
  <div>
    filter shown with <input value={filter} onChange={handleNewFilter}></input>
  </div>
);

export default SearchFilter;
