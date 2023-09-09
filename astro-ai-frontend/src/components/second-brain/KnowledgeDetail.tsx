import { VStack, Box, Flex, Button, Input, HStack, Textarea } from '@chakra-ui/react'
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

  return <VStack align={'left'} gap={5}>
    <Flex gap={5} alignItems={'center'}>
      <Button onClick={() => navigate('/everything')} variant={'ghost'}><BsChevronLeft /></Button>
      <Input
        size={'lg'}
        fontSize={'4xl'}
        paddingY={5}
        fontWeight={'bold'}
        type='text'
        placeholder='Enter title of Note'
        value={title}
        variant={'flushed'}
        onChange={handleTitleChange}
      />
      <Button variant={'solid'}>Save</Button>
      <Button variant={'outline'}>Delete</Button>
    </Flex>
    <HStack>
      { note.tags.map((tag, index) => <Box border={'1px solid gray'} borderRadius={'full'} paddingX={4} key={index}>{ tag }</Box> )}
    </HStack>
    <Textarea
      variant={'unstyled'}
      fontSize={'xl'}
      value={body}
      placeholder='Enter your note'
      onChange={handleBodyChange}
      resize={'none'}
      height={'75vh'}
      flexGrow={'inherit'}
    />
  </VStack>
}

export default KnowledgeDetail
