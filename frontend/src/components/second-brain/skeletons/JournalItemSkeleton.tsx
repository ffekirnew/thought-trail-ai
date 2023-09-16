import { Button, Checkbox, HStack, IconButton, Show, Skeleton, Spacer, Text } from '@chakra-ui/react'
import { BiSolidStar } from 'react-icons/bi'

const JournalItemSkeleton = () => {
  return <Skeleton borderRadius={10}>
  <HStack
    width={'100%'}
    border={'1px'}
    paddingX={5}
    gap={5}>
    <Checkbox />
    <IconButton
      aria-label={"favorite-journal"}
      icon={<BiSolidStar />}
      variant={'unstyled'} />
    <Button width={'100%'}>
      <HStack width={'100%'}>
        <Text>Journal Title</Text>
        <Show above={'lg'}>
          <Text>Journal Body</Text>
        </Show>
        <Spacer />
        <Text width={'6rem'}>Some Date</Text>
      </HStack>
    </Button>
  </HStack></Skeleton>
}

export default JournalItemSkeleton
