import { Select } from "@mantine/core";
import { useState } from "react";

function SelectComponent({ placeholder, nothingFound, data, onChange, value }) {
  const [searchValue, onSearchChange] = useState("");

  return (
    <Select
      placeholder={placeholder}
      searchable
      onSearchChange={onSearchChange}
      searchValue={searchValue}
      nothingFound={nothingFound}
      data={data}
      onChange={onChange}
      value={value}
    />
  );
}

export default SelectComponent;
