import { Text, VStack } from '@chakra-ui/react'
import NoteItem from '../../components/second-brain/NoteItem'
import useGetNotes from '../../hooks/useGetNotes';
import { Note } from '../../services/notesService';

const KnowledgePage = () => {
  const { data: response, isLoading, error } = useGetNotes();

  return <VStack align={'left'}>
    <Text fontWeight={'bold'}>August 2023</Text>
    { response?.data?.map((note: Note) => <NoteItem key={note._id} note={note} />) }
  </VStack>
}

export default KnowledgePage
