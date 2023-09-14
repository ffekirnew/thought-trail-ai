import userAvatar from '../../assets/user_avatar.png';
import logo from '../../assets/logo.svg';
import { Image, HStack, Button, Text, Show } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import ColorModeSwitch from '../shared/ColorModeSwitch';
import SearchBox from './SearchBox';
import { BsPlus } from 'react-icons/bs';

const NavBar = () => {
  const navigate = useNavigate();

  return <HStack height={'100%'} gap={2} width={'100%'} alignItems={'center'}>
    <Link to={'/everything'}>
      <Image src={logo} boxSize={'40px'} borderRadius={5} marginEnd={5}/>
    </Link>
    <SearchBox />
    <Show above={'lg'}><Button onClick={() => navigate('/chat')} variant={'outline'} borderRadius={'full'} paddingX={5}><Text>Chat</Text></Button></Show>
    <Show above={'lg'}><Button onClick={() => navigate('/everything/notes/new')} variant={'solid'} borderRadius={'full'} width={'15rem'} paddingX={5} background={'brand.primary'} color={'white'}>
      <BsPlus size={'40px'} /><Text>Add new Note</Text>
    </Button></Show>
    <ColorModeSwitch />
    <Image src={userAvatar} boxSize={{ base: '35px', lg: '50px'}} bg={'gray.900'} borderRadius={'full'}></Image>
  </HStack>
}

export default NavBar
