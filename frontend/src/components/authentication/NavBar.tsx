import logo from "../../assets/logo.svg";
import {
  Flex,
  HStack,
  StackDivider,
  Image,
  Text,
  Show,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ColorModeSwitch from "../shared/ColorModeSwitch";

const NavBar = () => {
  return (
    <Flex
      padding={3}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <HStack gap={5}>
        <Link to={"/"}>
          <HStack>
            <Image src={logo} boxSize={"35px"} borderRadius={5} />
            <Text as="h3" fontWeight={"bold"}>
              ThoughtTrail
            </Text>
          </HStack>
        </Link>
        <Show above={"lg"}>
          <StackDivider />
          <Text>Your companion AI second brain.</Text>
        </Show>
      </HStack>
      <HStack>
        <ColorModeSwitch />
      </HStack>
    </Flex>
  );
};

export default NavBar;
