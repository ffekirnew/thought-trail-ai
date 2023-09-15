import { HStack, Box, Text, useColorMode } from "@chakra-ui/react";
import { Chat } from "../../state/useChatStore";

interface Props {
  message: Chat
}

const botBackgroundColors = {
  "dark": "gray.600",
  "light": "gray.200"
}

const userBackgroundColors = {
  "dark": "gray.700",
  "light": "gray.300"
}

const ChatMessage = ({ message }: Props) => {
  const {colorMode} = useColorMode();
  return (<Box
    bg={message.sender === 'user' ? userBackgroundColors[colorMode] : botBackgroundColors[colorMode]}
    borderRadius={10}
    borderBottomRightRadius={message.sender === 'user' ? 0 : 10}
    borderBottomLeftRadius={message.sender === 'bot' ? 0 : 10}
    paddingY={3}
    paddingX={5}
    width={'95%'}
    marginLeft={message.sender === 'user' ? 'auto' : 0}
    marginRight={message.sender === 'user' ? 0 : 'auto'}
  >
    <HStack align={'start'} gap={5}>
      <Text fontSize={'md'}>{ message.body }</Text>
    </HStack>
  </Box>);
}

export default ChatMessage;
