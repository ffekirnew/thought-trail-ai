import { Image, Spacer, VStack, HStack, Text, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BiCircleThreeQuarter, BiEqualizer, BiFlag, BiMessageSquare, BiNote, BiSolidInbox, BiStar } from 'react-icons/bi';
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
      <Link to={'/everything/journals'}><SideBarOption text='Journals' icon={<BsFillJournalBookmarkFill />} /></Link>
      <Link to={'/everything/collections'}><SideBarOption text='Collections' icon={<BiSolidInbox />} /></Link>
      <Link to={'/everything/chat'}><SideBarOption text='Chat' icon={<BiMessageSquare />} /></Link>
      <SideBarOption text='Saved' icon={<BiStar />} />
      <SideBarOption text='Tasks' icon={<BiFlag />} />
    </VStack>
    <Spacer />
    <VStack align={'left'} width={'100%'} gap={2} paddingX={5}>
      <SideBarOption text='Plans' icon={<BiNote />} />
      <SideBarOption text='Goals' icon={<BiCircleThreeQuarter />} />
    </VStack>
    <Spacer />
    <VStack align={'left'} width={'100%'} gap={2} paddingX={5}>
      <SideBarOption text='Settings' icon={<BiEqualizer />} />
    </VStack>
    <SideBarUserComponent />
  </VStack>
}

export default SideBar
