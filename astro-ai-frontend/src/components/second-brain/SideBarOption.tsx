import { Button, Flex, Spacer, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { BsHouse } from 'react-icons/bs'

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
