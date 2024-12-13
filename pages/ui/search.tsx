import React from "react";
import { Input } from "antd";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const { Search } = Input;

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    if (value) {
      onSearch(value);
    }
  };

  return (
    <Search
      placeholder="Enter city name..."
      allowClear
      onSearch={handleSearch}
    />
  );
};
