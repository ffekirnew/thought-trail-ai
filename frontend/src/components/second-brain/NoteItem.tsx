import { Flex, Checkbox, Spacer, Button, Text } from '@chakra-ui/react'
import { BsPencil } from 'react-icons/bs'
import EditMenu from './EditMenu'
import { useNavigate } from 'react-router-dom';
import { Note } from '../../pages/second-brain/KnowledgePage';

interface Props {
  note: Note;
}
const NoteItem = ({ note }: Props) => {
  const navigate = useNavigate();
  return <Flex border={'1px'} paddingX={5} borderColor={'gray.700'} borderRadius={10} alignItems={'center'}>
    <Checkbox />
    <Text marginX={5}>{ note.title }</Text>
    <Spacer />
    <EditMenu />
    <Button onClick={() => navigate('/everything/notes/' + note.id)} variant={'ghost'}><BsPencil /></Button>
  </Flex> 
}

export default NoteItem