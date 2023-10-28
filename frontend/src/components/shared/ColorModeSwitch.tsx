import { Button, HStack, useColorMode } from "@chakra-ui/react";
import { BiSolidMoon, BiSun } from "react-icons/bi";

interface Props {
  variant?: "outline" | "solid" | "ghost" | "unstyled" | "link";
}
const ColorModeSwitch = ({ variant }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack>
      <Button background={"none"} variant={variant} onClick={toggleColorMode}>
        {colorMode !== "dark" ? <BiSun /> : <BiSolidMoon />}
      </Button>
    </HStack>
  );
};

export default ColorModeSwitch;
