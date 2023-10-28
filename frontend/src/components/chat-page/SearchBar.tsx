import { HStack } from "@chakra-ui/react";
import SearchBox from "../second-brain/SearchBox";

const SearchBar = () => {
  return (
    <HStack height={"100%"} alignItems={"center"} spacing={5}>
      <SearchBox />
    </HStack>
  );
};

export default SearchBar;
