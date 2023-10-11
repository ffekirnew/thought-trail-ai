import { Box, HStack, Show, Spacer, VStack, useColorMode } from '@chakra-ui/react';
import NavBar from '../../components/authentication/NavBar';
import { Outlet } from 'react-router-dom';
import './AuthenticationPage.css'

const AuthenticationPage = () => {
  const {colorMode} = useColorMode();

  return <HStack>
    <VStack height={'100vh'} width={'100%'} overflowY={'scroll'}>
      <Outlet />
    </VStack>
    <Show above={'lg'}>
      <VStack
        width={'100%'} 
        height={'100vh'}
        className='illustration'
        align={'left'}
        >
        <Spacer />
        <Box bg={colorMode === 'dark'? 'gray.800' : 'gray.50'} margin={5} borderRadius={10} boxShadow={'dark-lg'}>
          <NavBar />
        </Box>
      </VStack>
    </Show>
  </HStack>
}

export default AuthenticationPage;
