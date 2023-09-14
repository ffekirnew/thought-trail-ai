import { Button, HStack, useColorMode } from '@chakra-ui/react';
import { BsMoonFill, BsSun} from 'react-icons/bs';

interface Props {
  variant?: "outline" | "solid" | "ghost" | "unstyled" | "link"
}
const ColorModeSwitch = ({ variant }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode()
  return <HStack>
    <Button background={'none'} variant={variant} onClick={toggleColorMode}>
      { colorMode !== 'dark' ? <BsSun /> : <BsMoonFill /> }
    </Button>
  </HStack>
}

export default ColorModeSwitch;
