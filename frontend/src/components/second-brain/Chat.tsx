import { HStack, Box, Text, Image, useColorMode } from "@chakra-ui/react";
import userAvatar from '../../assets/user_avatar.png';
import botAvatar from '../../assets/bot_avatar.png';

export interface Message {
  type: "user" | "bot";
  body: string
}

interface Props {
  message: Message
}

const botBackgroundColors = {
  "dark": "gray.600",
  "light": "gray.200"
}

const userBackgroundColors = {
  "dark": "gray.700",
  "light": "gray.300"
}

const Chat = ({ message }: Props) => {
  const {colorMode} = useColorMode();
  return (<Box
  bg={ message.type === 'user' ? userBackgroundColors[colorMode] : botBackgroundColors[colorMode] } borderRadius={10} padding={5}>
    <HStack align={'start'} gap={5}>
      { message.type === "user" && <Image src={userAvatar} boxSize={'40px'} /> }
      { message.type === "bot" && <Image src={botAvatar} boxSize={'40px'} /> }
      <Text fontSize={'md'}>{ message.body }</Text>
    </HStack>
  </Box>);
}

export default Chat;
