import { HStack, Button, Text, Show, useDisclosure, Drawer, DrawerOverlay, DrawerBody, DrawerContent } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { BsPlus } from 'react-icons/bs';
import { BiMenu } from 'react-icons/bi';
import { useRef } from 'react';
import SideBar from './SideBar';

const NavBar = () => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return <HStack height={'100%'} gap={{ base: 1, lg: 2}} width={'100%'} alignItems={'center'}>
    <Show below={'lg'}>
      <Button onClick={onOpen} variant={'ghost'}><BiMenu size={'30px'} /></Button>
    </Show>
    <SearchBox />
    <Show above={'lg'}><Button onClick={() => navigate('/chat')} variant={'outline'} borderRadius={'full'} paddingX={5}><Text>Chat</Text></Button></Show>
    <Show above={'lg'}><Button onClick={() => navigate('/everything/notes/new')} variant={'solid'} borderRadius={'full'} width={'15rem'} paddingX={5} background={'brand.primary'} color={'white'}>
      <BsPlus size={'40px'} /><Text>Add new Note</Text>
    </Button></Show>
    <Drawer
      isOpen={isOpen}
      placement='left'
      onClose={onClose}
      finalFocusRef={btnRef}
      >
      <DrawerOverlay />
      <DrawerContent padding={0}>
        <DrawerBody padding={0}>
          <SideBar />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  </HStack>
}

export default NavBar
