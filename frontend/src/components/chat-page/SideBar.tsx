import { Heading, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import AddKnowledge from "./AddKnowledge";

const SideBar = () => {
  const { pathname } = useLocation();

  if (pathname == "/global-search")
    return <VStack>
      <Heading>This is what your search history.</Heading>
    </VStack>
  return <VStack>
    <AddKnowledge />
  </VStack>
}

export default SideBar;
