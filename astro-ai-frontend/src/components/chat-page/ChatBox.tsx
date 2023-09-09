import { Button, Center, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

interface Props {
  buttonText: string
}
const ChatBox = ({ buttonText }: Props) => {
  return <Center height={'100%'}>
    <InputGroup size={'lg'} borderRadius={10} overflow={'none'}>
      <Input size={'lg'} outlineColor={'transparent'} variant={'filled'} placeholder='Send a message'/>
      <InputRightElement width={'3.5rem'} marginX={'0.5rem'}>
        <Button variant={'outline'} size={'sm'}>
          { buttonText }
        </Button>
      </InputRightElement>
    </InputGroup>
  </Center>
}

export default ChatBox
