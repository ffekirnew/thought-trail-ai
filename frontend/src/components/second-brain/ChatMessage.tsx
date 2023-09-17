import { HStack, Box, Text, useColorMode, Spacer, Button } from "@chakra-ui/react";
import { Chat } from "../../state/useChatStore";
import { BiLogoAlgolia, BiRecycle, BiRedo, BiSave, BiSolidSave } from "react-icons/bi";

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
    { message.sender === 'bot' &&
      <HStack>
        <Spacer />
        <Button variant={'solid'} size={'sm'} >Save</Button>
        <Button variant={'solid'} size={'sm'} >Regenerate</Button>
      </HStack>
    }
    <HStack align={'start'} gap={5}>
      <Text fontSize={'md'}>{ message.body }</Text>
    </HStack>
  </Box>);
}

export default ChatMessage;
