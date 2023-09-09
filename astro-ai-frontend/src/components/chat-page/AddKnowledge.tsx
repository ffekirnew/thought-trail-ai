import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { BsPlus } from 'react-icons/bs'

const AddKnowledge = () => {
  return (<Button width={'100%'} size={'lg'} border={'1px'} borderRadius={5} borderColor={'gray.600'}>
    <Flex width={'100%'} alignItems={'center'}>
      <Text>Add Knowledge</Text>
      <Spacer />
      <BsPlus size={'30px'} />
    </Flex>
  </Button>)
}

export default AddKnowledge
