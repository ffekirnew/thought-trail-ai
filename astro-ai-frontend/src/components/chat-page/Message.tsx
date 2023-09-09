import userAvatar from '../../assets/user_avatar.png';
import botAvatar from '../../assets/bot_avatar.png';
import { Box, Text, HStack, Image } from "@chakra-ui/react"

interface Props {
  role: "user" | "bot"
  body: string
}
const Message = ({ role, body }: Props) => {
  return (<Box border={'1px'} borderColor={'gray.700'} borderRadius={10} padding={5} outlineColor={'yellow'}>
    <HStack align={'start'} gap={5}>
      <Image src={role === "user" ? userAvatar : botAvatar} boxSize={'40px'} />
      <Text fontSize={'md'}>{ body }</Text>
    </HStack>
  </Box>);
}

export default Message
