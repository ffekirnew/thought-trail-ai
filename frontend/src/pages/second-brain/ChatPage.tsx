import { Flex, Grid, GridItem } from '@chakra-ui/react';
import ChatBox from '../../components/chat-page/ChatBox';
import Chat, { Message } from '../../components/second-brain/Chat';

const ChatPage = () => {
  const messages: Message[] = [
    { type: "user", body: "Hello" },
    { type: "bot", body: "Hey! How can I help you today?" },
    { type: "user", body: "I want to know about the products you sell" },
    { type: "bot", body: "Sure! We have a wide range of products on our website. You can check it out at www.example.com" },
    { type: "user", body: "Thanks!" },
    { type: "bot", body: "No problem! Have a nice day!" },
    { type: "user", body: "Hello" },
    { type: "bot", body: "Hey! How can I help you today?" },
    { type: "user", body: "I want to know about the products you sell" },
    { type: "bot", body: "Sure! We have a wide range of products on our website. You can check it out at www.example.com. Sure! We have a wide range of products on our website. You can check it out at www.example.com. Sure! We have a wide range of products on our website. You can check it out at www.example.com. Sure! We have a wide range of products on our website. You can check it out at www.example.com. Sure! We have a wide range of products on our website. You can check it out at www.example.com. Sure! We have a wide range of products on our website. You can check it out at www.example.com." },
    { type: "user", body: "Thanks!" },
    { type: "bot", body: "No problem! Have a nice day!" },
  ]
  return <Grid
  templateAreas={`"chat" "chatbox"`}
  templateColumns={"1fr"}
  templateRows={"minmax(0, 1fr) auto"}
  gap={5}
  paddingBottom={5}
  height={'100%'}>
    <GridItem area={'chat'} overflowY={'scroll'}>
      <Flex flexDirection={'column'} gap={2}>
        { messages.map((search, index) => <Chat key={index} message={search} />) }
      </Flex>
    </GridItem>
    <GridItem area={'chatbox'}>
      <ChatBox buttonText={'Search'} />
    </GridItem>
  </Grid>
}

export default ChatPage
