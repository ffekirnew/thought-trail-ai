import { VStack } from '@chakra-ui/react';
import ChatBox from '../components/chat-page/ChatBox';
import Search, { SearchType } from '../components/chat-page/Search';
import ChatLayout from '../components/chat-page/ChatLayout';

const GlobalSearchPage = () => {
  const searches: SearchType[] = [
    { type: "search", body: "Hello" },
    { type: "result", body: "Hey! How can I help you today?" },
    { type: "search", body: "I want to know about the products you sell" },
    { type: "result", body: "Sure! We have a wide range of products on our website. You can check it out at www.example.com" },
    { type: "search", body: "Thanks!" },
    { type: "result", body: "No problem! Have a nice day!" },
    { type: "search", body: "Hello" },
    { type: "result", body: "Hey! How can I help you today?" },
    { type: "search", body: "I want to know about the products you sell" },
    { type: "result", body: "Sure! We have a wide range of products on our website. You can check it out at www.example.com. Sure! We have a wide range of products on our website. You can check it out at www.example.com. Sure! We have a wide range of products on our website. You can check it out at www.example.com. Sure! We have a wide range of products on our website. You can check it out at www.example.com. Sure! We have a wide range of products on our website. You can check it out at www.example.com. Sure! We have a wide range of products on our website. You can check it out at www.example.com." },
    { type: "search", body: "Thanks!" },
    { type: "result", body: "No problem! Have a nice day!" },
  ]
  return <ChatLayout
    body={
    <VStack alignItems={'left'}>
        { searches.map((search, index) => <Search key={index} content={search} />) }
    </VStack>}
    chatBox={<ChatBox buttonText={'Search'} />}
  />
}

export default GlobalSearchPage
