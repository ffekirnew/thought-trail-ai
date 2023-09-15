import { Button, Flex, Grid, GridItem, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import ChatBox from '../../components/chat-page/ChatBox';
import useChatStore from '../../state/useChatStore';
import ChatMessage from '../../components/second-brain/ChatMessage';
import { useRef, useEffect } from 'react';
import { BsChevronDown } from 'react-icons/bs';

const ChatPage = () => {
  const { chats } = useChatStore();
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chats.length]);

  return <Grid
    templateAreas={`"chat" "chatbox"`}
    templateColumns={"1fr"}
    templateRows={"minmax(0, 1fr) auto"}
    gap={3}
    paddingBottom={3}
    height={'100%'}
  >
    <GridItem area={'chat'}>
      <Grid gap={5} height={'100%'} templateRows={"auto minmax(0, 1fr)"}>
        <GridItem>
          <HStack>
            <Menu>
              <MenuButton as={Button} variant={'solid'} rightIcon={<BsChevronDown />}>Based On</MenuButton>
              <MenuList>
                <MenuItem>Journal</MenuItem>
                <MenuItem>A Collection</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} variant={'solid'} rightIcon={<BsChevronDown />}>Collection</MenuButton>
              <MenuList>
                <MenuItem>Collection 1</MenuItem>
                <MenuItem>Collection 2</MenuItem>
                <MenuItem>Collection 3</MenuItem>
                <MenuItem>Collection 4</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </GridItem>
        <GridItem height={'100%'} overflowY={'scroll'} ref={chatRef}>
          <Flex flexDir={'column'} justifyContent={'center'}>
            { chats.length == 0 && <Text textAlign={'center'} color={'gray.600'}>Start chatting with our bot.</Text> }
          </Flex>
          <Flex flexDir={'column'} gap={3}>
            { chats.map((message, index) => <ChatMessage key={index} message={message} />) }
          </Flex>
        </GridItem>
      </Grid>
    </GridItem>
    <GridItem area={'chatbox'}>
      <ChatBox />
    </GridItem>
  </Grid>
}

export default ChatPage;
