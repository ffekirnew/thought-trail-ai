import { Box, HStack, Show, VStack } from '@chakra-ui/react';
import NavBar from '../../components/authentication/NavBar';
import { Outlet } from 'react-router-dom';
import './AuthenticationPage.css'

const AuthenticationPage = () => {
  return <HStack>
    <VStack height={'100vh'} width={'100%'}>
      <NavBar />
      <Outlet />
    </VStack>
    <Show above={'lg'}>
      <Box height={'100vh'} width={'100%'} className='illustration'></Box>
    </Show>
  </HStack>
}

export default AuthenticationPage;
