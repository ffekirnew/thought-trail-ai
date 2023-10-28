import { HStack, Box, Text, Image } from "@chakra-ui/react";
import userAvatar from "../../assets/user_avatar.png";
import botAvatar from "../../assets/bot_avatar.png";

export interface SearchType {
  type: "search" | "result";
  body: string;
}

interface Props {
  content: SearchType;
}

const Search = ({ content }: Props) => {
  return (
    <Box border={"1px"} borderColor={"gray.700"} borderRadius={10} padding={5}>
      <HStack align={content.type == "result" ? "start" : "center"} gap={5}>
        {content.type === "search" && (
          <Image src={userAvatar} boxSize={"40px"} />
        )}
        {content.type === "result" && (
          <Image src={botAvatar} boxSize={"40px"} />
        )}
        <Text fontSize={"md"}>{content.body}</Text>
      </HStack>
    </Box>
  );
};

export default Search;
