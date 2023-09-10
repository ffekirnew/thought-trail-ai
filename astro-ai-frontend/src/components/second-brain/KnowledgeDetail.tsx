import { VStack, Box, Flex, Button, Input, HStack, Textarea, Text } from '@chakra-ui/react'
import { BsChevronLeft } from 'react-icons/bs'
import { Note } from '../../pages/second-brain/KnowledgePage'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface Props {
  note: Note
}
const KnowledgeDetail = ({ note }: Props) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  return <VStack align={'left'} gap={3}>
    <Flex gap={2} alignItems={'center'}>
      <Button onClick={() => navigate('/everything')} variant={'ghost'}><BsChevronLeft color={'brand.primary'} /></Button>
      <Input
        size={'lg'}
        fontSize={'4xl'}
        paddingY={5}
        fontWeight={'bold'}
        type='text'
        placeholder='Title of your note.'
        value={title}
        variant={'unstyled'}
        onChange={handleTitleChange}
      />
      <Button variant={'solid'} background={'brand.secondary'} color={'white'}>Save</Button>
      <Button variant={'outline'} borderColor={'brand.primary'} color={'brand.primary'}>Delete</Button>
    </Flex>
    <HStack>
      <Text fontWeight={'bold'}>Tags: </Text>
      { note.tags.map((tag, index) => <Box border={'1px solid gray'} borderRadius={'full'} paddingX={4} key={index}>{ tag }</Box> )}
    </HStack>
    <Textarea
      variant={'unstyled'}
      fontSize={'xl'}
      value={body}
      placeholder='Content of your note.'
      onChange={handleBodyChange}
      resize={'none'}
      height={'75vh'}
      flexGrow={'inherit'}
    />
  </VStack>
}

export default KnowledgeDetail
