import { Flex, Image, HStack, Text, Button, StackDivider, Show } from '@chakra-ui/react';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import ColorModeSwitch from '../shared/ColorModeSwitch';

const NavBar = () => {
  return <Flex paddingX={{ base: 5, lg: 10 }} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'space-between'} >
    <HStack gap={5} divider={<StackDivider />}>
      <Link to={'/'}>
        <HStack>
          <Image src={logo} boxSize={'35px'} borderRadius={5}/>
          <Text as="h3" fontSize={'xl'} fontWeight={'bold'}>ThoughtTrail</Text>
        </HStack>
      </Link>
      <Show above={'lg'}><HStack>
        <Link to={''}><Button variant={'ghost'} fontWeight={'normal'}>What is ThoughtTrail?</Button></Link>
        <Link to={''}><Button variant={'ghost'} fontWeight={'normal'}>Features</Button></Link>
        <Link to={''}><Button variant={'ghost'} fontWeight={'normal'}>How to use it?</Button></Link>
      </HStack></Show>
    </HStack>
    <HStack>
      <ColorModeSwitch />
      <Link to={'auth/sign-in'}><Button variant={'outline'} fontWeight={'normal'}>Sign In</Button></Link>
      <Show above={'lg'}><Link to={'auth/register'}><Button variant={'solid'} fontWeight={'normal'}>Register</Button></Link></Show>
    </HStack>
  </Flex>
}

export default NavBar;
