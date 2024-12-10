import React from "react";
import { Input } from "antd";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

export const SearchBar = () => {
  return (
    <Search
      placeholder="input search text"
      allowClear
      onSearch={onSearch} />
  );
};
