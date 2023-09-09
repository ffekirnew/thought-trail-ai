import userAvatar from '../../assets/user_avatar.png';
import logo from '../../assets/react.svg';
import { Image, HStack, Button, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import ColorModeSwitch from '../shared/ColorModeSwitch';
import SearchBox from './SearchBox';
import { BsPlus } from 'react-icons/bs';

const NavBar = () => {
  const navigate = useNavigate();

  return <HStack height={'100%'} gap={2} width={'100%'} alignItems={'center'}>
    <Link to={''}>
      <Image src={logo} boxSize={'40px'} borderRadius={5}/>
    </Link>
    <SearchBox />
    <Button onClick={() => navigate('/chat')} variant={'outline'} borderRadius={'full'} paddingX={5}><Text>Chat</Text></Button>
    <Button onClick={() => navigate('/everything/notes/new')} variant={'solid'} borderRadius={'full'} width={'23rem'} paddingX={5}>
      <BsPlus size={'40px'} /><Text>Add new Knowledge</Text>
    </Button>
    <ColorModeSwitch />
    <Image src={userAvatar} boxSize={'50px'} bg={'gray.900'} borderRadius={'full'}></Image>
  </HStack>
}

export default NavBar
