import { Image, Spacer, VStack, HStack, Text, useColorMode, InputGroup, Input, InputRightElement, IconButton, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BiEqualizer, BiMessageSquare, BiSearch, BiSolidInbox } from 'react-icons/bi';
import SideBarOption from './SideBarOption';

import logo from '../../assets/logo.svg';
import ColorModeSwitch from '../shared/ColorModeSwitch';
import SideBarUserComponent from './SideBarUserComponent';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';

const SideBar = () => {
  const { colorMode } = useColorMode();

  return <VStack
  align={'left'}
  height={'100vh'}
  flexDirection={'column'}
  width={'100%'}
  bg={ colorMode === 'dark' ? 'gray.700' : 'gray.200'}
  gap={5}>
    <HStack width={'100%'} gap={2} alignItems={'center'} padding={5}>
      <Link to={'/everything'}>
        <Image src={logo} boxSize={'30px'} borderRadius={'full'}/>
      </Link>
      <Text as={'h2'} fontSize={'md'} fontWeight={'semibold'} marginEnd={5}>ThoughtTrail AI</Text>
      <Spacer />
      <ColorModeSwitch variant={'ghost'} />
    </HStack>
    <VStack align={'left'} width={'100%'} gap={2} paddingX={5}>
      <InputGroup outline={'brand.primary'} overflow={'hidden'} gap={5}>
        <Input placeholder='Search...' borderRadius={10} variant={'outline'} overflow={'hidden'}/>
        <InputRightElement padding={2}>
          <IconButton aria-label={'search-everything'} as={Button} variant={'outline'}>
            <BiSearch />
          </IconButton>
        </InputRightElement>
      </InputGroup> 
      <Link to={'/everything/chat'}><SideBarOption text='Chat' icon={<BiMessageSquare />} /></Link>
      <Link to={'/everything/journals'}><SideBarOption text='Journals' icon={<BsFillJournalBookmarkFill />} /></Link>
      <Link to={'/everything/collections'}><SideBarOption text='Collections' icon={<BiSolidInbox />} /></Link>
    </VStack>
    <Spacer />
    <VStack align={'left'} width={'100%'} gap={2} paddingX={5}>
      <Link to={'/everything/account'}><SideBarOption text='Account Stats' icon={<BiEqualizer />} /></Link>
    </VStack>
    <SideBarUserComponent />
  </VStack>
}

export default SideBar;
