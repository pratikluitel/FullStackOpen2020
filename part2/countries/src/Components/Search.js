import React from "react";

const Search = ({ searchVal, handleSearchVal }) => {
  return (
    <div>
      find countries{" "}
      <input value={searchVal} onChange={handleSearchVal}></input>
    </div>
  );
};

export default Search;
