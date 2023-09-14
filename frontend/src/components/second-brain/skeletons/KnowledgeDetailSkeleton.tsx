import { Button, Flex, HStack, Input, Skeleton, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { BsChevronLeft } from 'react-icons/bs';

const KnowledgeDetailSkeleton = () => {
  return <><VStack align={'left'} gap={3}>
    <Flex gap={2} alignItems={'center'} width={'100%'} height={'35px'}>
      <Skeleton height={'100%'}>
        <Button><BsChevronLeft color={'brand.primary'} /></Button>
      </Skeleton>
      <Skeleton height={'100%'} width={'100%'}>
      <Input
        size={'lg'}
        fontSize={'xl'}
        fontWeight={'bold'}
        type='text'
        placeholder='Title of your note.'
        value={''}
        variant={'unstyled'}
        onChange={() => {}}
      />
      </Skeleton>
      <Skeleton height={'100%'}><Button>Save</Button></Skeleton>
      <Skeleton height={'100%'}><Button>Delete</Button></Skeleton>
    </Flex>
    <HStack>
      <Skeleton><Text fontWeight={'extrabold'}>Tags are good</Text></Skeleton>
    </HStack>
    <SkeletonText mt='4' noOfLines={8} spacing='4' skeletonHeight='4' height={'1200px'} flexGrow={1} />
  </VStack> 
  </>
}

export default KnowledgeDetailSkeleton;
