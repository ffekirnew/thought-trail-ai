import { Box, HStack, VStack } from '@chakra-ui/react';
import NavBar from '../../components/authentication/NavBar';
import { Outlet } from 'react-router-dom';
import './AuthenticationPage.css'

const AuthenticationPage = () => {
  return <HStack>
    <VStack height={'100vh'} width={'100%'}>
      <NavBar />
      <Outlet />
    </VStack>
    <Box height={'100vh'} width={'150%'} className='illustration'></Box>
  </HStack>
}

export default AuthenticationPage;
