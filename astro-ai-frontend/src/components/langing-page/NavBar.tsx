import { Flex, Image, HStack, Text, Button, StackDivider } from '@chakra-ui/react';
import logo from '../../assets/react.svg';
import { Link } from 'react-router-dom';
import ColorModeSwitch from '../shared/ColorModeSwitch';

const NavBar = () => {
  return <Flex paddingX={10} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'space-between'} >
    <HStack gap={5} divider={<StackDivider />}>
      <Link to={'/'}>
        <HStack gap={5}>
          <Image src={logo} boxSize={'35px'} borderRadius={5}/>
          <Text as="h3" fontSize={'xl'} fontWeight={'bold'}>Astro AI</Text>
        </HStack>
      </Link>
      <HStack>
        <Link to={''}><Button variant={'ghost'} fontWeight={'normal'}>What is Astro?</Button></Link>
        <Link to={''}><Button variant={'ghost'} fontWeight={'normal'}>Features</Button></Link>
        <Link to={''}><Button variant={'ghost'} fontWeight={'normal'}>How to use it?</Button></Link>
      </HStack>
    </HStack>
    <HStack>
      <ColorModeSwitch />
      <Link to={'auth/sign-in'}><Button variant={'outline'} fontWeight={'normal'}>Sign In</Button></Link>
      <Link to={'auth/register'}><Button variant={'solid'} fontWeight={'normal'}>Register</Button></Link>
    </HStack>
  </Flex>
}

export default NavBar;
