import logo from '../../assets/react.svg';
import { Flex, HStack, StackDivider, Button, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ColorModeSwitch from '../shared/ColorModeSwitch';

const NavBar = () => {
  return <Flex padding={5} width={'100%'} alignItems={'center'} justifyContent={'space-between'} >
    <HStack gap={5} divider={<StackDivider />}>
      <Link to={'/'}>
        <HStack>
          <Image src={logo} boxSize={'35px'} borderRadius={5}/>
          <Text as="h3" fontWeight={'bold'}>Astro AI</Text>
        </HStack>
      </Link>
      <Text>Your AI second brain.</Text>
    </HStack>
    <HStack>
      <ColorModeSwitch />
    </HStack>
  </Flex>

}

export default NavBar
