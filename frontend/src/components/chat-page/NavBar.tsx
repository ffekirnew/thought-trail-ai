import { Image, Flex, Spacer, HStack, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useState } from "react";
import ColorModeSwitch from "../shared/ColorModeSwitch";

interface Option {
  title: string;
  route: string;
}

const NavBar = () => {
  const options: Option[] = [
    { title: "Global Search", route: "global-search" },
    { title: "Second Brain", route: "second-brain" },
  ];
  const navigate = useNavigate();
  const [mode, setMode] = useState<string>(options[0].route);

  return (
    <Flex height={"100%"} alignItems={"center"}>
      <Link to={"/"}>
        <Image src={logo} boxSize={"40px"} borderRadius={5} />
      </Link>
      <Spacer />
      <HStack>
        {options.map(({ title, route }, index) => (
          <Button
            onClick={() => {
              setMode(title);
              navigate("/" + route);
            }}
            key={index}
            variant={mode === title ? "solid" : "ghost"}
          >
            {title}
          </Button>
        ))}
      </HStack>
      <Spacer />
      <ColorModeSwitch />
    </Flex>
  );
};

export default NavBar;
