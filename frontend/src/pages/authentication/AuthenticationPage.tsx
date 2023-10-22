import {
  HStack,
  Show,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import NavBar from "../../components/authentication/NavBar";
import { Outlet } from "react-router-dom";
import "./AuthenticationPage.css";

const AuthenticationPage = () => {
  const { colorMode } = useColorMode();

  return (
    <HStack>
      <Show above={"lg"}>
        <VStack
          width={"100%"}
          height={"100vh"}
          className="illustration"
          align={"left"}
          justifyContent={"center"}
        >
          <VStack
            bg={colorMode === "dark" ? "gray.800" : "gray.50"}
            margin={5}
            borderRadius={10}
            boxShadow={"dark-lg"}
            height={"50%"}
            justifyContent={"center"}
          >
            <NavBar />
          </VStack>
        </VStack>
      </Show>
      <VStack height={"100vh"} width={"100%"} overflowY={"scroll"}>
        <Outlet />
      </VStack>
    </HStack>
  );
};

export default AuthenticationPage;
