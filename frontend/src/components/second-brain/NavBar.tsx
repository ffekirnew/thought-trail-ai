import { HStack, Button, Text, Show, useDisclosure, Drawer, DrawerOverlay, DrawerBody, DrawerContent } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { BiMenu } from 'react-icons/bi';
import { useRef } from 'react';
import SideBar from './SideBar';
import useNewJournalStore from '../../state/useNewJournalStore';

const NavBar = () => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const setJournal = useNewJournalStore(s => s.setJournal);

  const onAddJournal = () => {
    setJournal(undefined);
    navigate('/everything/journals/new');
  }

  return <HStack height={'100%'} gap={{ base: 1, lg: 2}} width={'100%'} alignItems={'center'}>
    <Show below={'lg'}>
      <Button onClick={onOpen} variant={'ghost'}><BiMenu size={'30px'} /></Button>
    </Show>
    <SearchBox />
    <Show above={'lg'}>
      <Button onClick={onAddJournal} variant={'solid'} borderRadius={10} paddingX={10} background={'brand.primary'} color={'white'}>
        <Text>Add a Journal</Text>
      </Button>
      <Button onClick={() => navigate('/everything/chat')} variant={'outline'} borderRadius={10} paddingX={5}>
        <Text>Chat</Text>
      </Button>
    </Show>

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
