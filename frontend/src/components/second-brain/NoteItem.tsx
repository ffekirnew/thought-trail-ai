import { Flex, Spacer, Button, Show } from '@chakra-ui/react'
import { BsPencil } from 'react-icons/bs'
import EditMenu from './EditMenu'
import { useNavigate } from 'react-router-dom';
import { Note } from '../../services/notesService';

interface Props {
  note: Note;
}
const NoteItem = ({ note }: Props) => {
  const navigate = useNavigate();
  return <Flex borderColor={'gray.700'} gap={1} borderRadius={10} alignItems={'center'}>
    <Button as={'h3'} disabled={true} variant={'ghost'} width={'100%'} justifyContent={'left'} textAlign={'left'} overflow={'hidden'}>{ note.title }</Button>
    <Spacer />
    <Show above='lg'><EditMenu noteId={note?._id!} /></Show>
    <Button onClick={() => navigate('/everything/notes/' + note._id)} variant={'outline'}><BsPencil /></Button>
  </Flex> 
}

export default NoteItem
