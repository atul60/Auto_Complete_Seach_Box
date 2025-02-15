import React, { ChangeEvent, useState } from "react";

interface ISearchBox {
  searchText: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBox: React.FC<ISearchBox> = ({
  handleChange,
  searchText,
}) => {
  return (
    <>
      <input value={searchText} onChange={handleChange} />
    </>
  );
};
