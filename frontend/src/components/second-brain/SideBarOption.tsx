import { Button, Flex, Spacer, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  text: string;
  icon: ReactNode;
}
const SideBarOption = ({ text, icon }: Props) => {
  return <Button variant={'ghost'} borderRadius={'full'}>
    <Flex width={'100%'} alignItems={'center'}>
      <Text fontWeight={'normal'}>{ text }</Text>
      <Spacer />
      { icon }
    </Flex>
  </Button> 
}

export default SideBarOption
