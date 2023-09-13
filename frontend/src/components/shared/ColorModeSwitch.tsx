import { Button, HStack, useColorMode } from '@chakra-ui/react';
import { BsMoonFill, BsSun} from 'react-icons/bs';

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  return <HStack>
    <Button background={'none'} onClick={toggleColorMode}>{ colorMode !== 'dark' ? <BsSun /> : <BsMoonFill /> }</Button>
  </HStack>
}

export default ColorModeSwitch;
