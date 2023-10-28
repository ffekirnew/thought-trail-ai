import { Button, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  text: string;
  icon: ReactNode;
}
const SideBarOption = ({ text, icon }: Props) => {
  return (
    <Button width={"100%"} variant={"ghost"} borderRadius={5} padding={0}>
      <Flex width={"100%"} alignItems={"center"} gap={5} paddingX={3}>
        {icon}
        <Text fontWeight={"normal"}>{text}</Text>
      </Flex>
    </Button>
  );
};

export default SideBarOption;
