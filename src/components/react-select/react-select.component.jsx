import React from "react";
import Select from "react-select";
import { useState } from "react";

function ReactSelect({
  options,
  value,
  defaultValue,
  placeholder,
  onChange,
}) {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isDisabled={isDisabled}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name="color"
        value={value}
        options={options}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}

export default ReactSelect;
