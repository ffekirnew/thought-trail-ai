import { Button, Center, InputGroup, InputRightElement, Textarea } from '@chakra-ui/react'

interface Props {
  buttonText: string
}
const ChatBox = ({ buttonText }: Props) => {
  return <Center height={'100%'}>
    <InputGroup size={'lg'} borderRadius={10} overflow={'none'} alignItems={'center'}>
      <Textarea
        outlineColor={'transparent'}
        variant={'filled'}
        placeholder='Send a message'
        resize={'none'}
      />
      <InputRightElement width={'3.5rem'} marginX={'1rem'}>
        <Button variant={'outline'} size={'sm'}>
          { buttonText }
        </Button>
      </InputRightElement>
    </InputGroup>
  </Center>
}

export default ChatBox
