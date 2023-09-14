import { HStack, Button, Text, Show } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { BsPlus } from 'react-icons/bs';

const NavBar = () => {
  const navigate = useNavigate();

  return <HStack height={'100%'} gap={2} width={'100%'} alignItems={'center'}>
    <SearchBox />
    <Show above={'lg'}><Button onClick={() => navigate('/chat')} variant={'outline'} borderRadius={'full'} paddingX={5}><Text>Chat</Text></Button></Show>
    <Show above={'lg'}><Button onClick={() => navigate('/everything/notes/new')} variant={'solid'} borderRadius={'full'} width={'15rem'} paddingX={5} background={'brand.primary'} color={'white'}>
      <BsPlus size={'40px'} /><Text>Add new Note</Text>
    </Button></Show>
  </HStack>
}

export default NavBar
