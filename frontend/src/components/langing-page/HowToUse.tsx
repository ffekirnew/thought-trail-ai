import { Flex, Heading, Image } from '@chakra-ui/react'

import addJournal from '../../assets/addJournal.png';
import addCollection from '../../assets/addCollection.png';
import chat from '../../assets/chat.png';

const HowToUse = () => {
  return <Flex flexDir={'column'} paddingX={{ base: 10, lg: 40 }} gap={10}>
    <Heading textAlign={'left'}>How to use it?</Heading> 
    <Image src={addJournal} width={'60%'} borderRadius={10} borderWidth={'1px'} />
    <Image src={addCollection} width={'60%'} borderRadius={10} borderWidth={'1px'} />
    <Image src={chat} width={'60%'} borderRadius={10} borderWidth={'1px'} />
  </Flex>
}

export default HowToUse
