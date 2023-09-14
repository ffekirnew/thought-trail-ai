import { Skeleton, Text, VStack } from '@chakra-ui/react'
import NoteItem from '../../components/second-brain/NoteItem'
import useGetNotes from '../../hooks/useGetNotes';
import { Note } from '../../services/notesService';
import NoteItemSkeleton from '../../components/second-brain/skeletons/NoteItemSkeleton';

const KnowledgePage = () => {
  const { data: response, isLoading } = useGetNotes();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  if (isLoading) return <VStack align={'left'}>
    <Skeleton width={'100px'} height={'30px'} />    { skeletons.map((skeleton) => <NoteItemSkeleton key={skeleton} />) }
    </VStack>

  return <VStack align={'left'}>
    <Text fontWeight={'bold'}>August 2023</Text>
    { response?.data?.map((note: Note) => <NoteItem key={note._id} note={note} />) }
  </VStack>
}

export default KnowledgePage
