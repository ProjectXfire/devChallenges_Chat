import React from "react";
// Providers
import { BiSearch } from "react-icons/bi";
// Styles
import { SSearch } from "@styles/shared/search";
import { colors } from "@styles/variables/colors";

export const Search = () => {
  return (
    <SSearch>
      <BiSearch size="20" color={colors.grey} />
      <input type="text" placeholder="Search" />
    </SSearch>
  );
};
