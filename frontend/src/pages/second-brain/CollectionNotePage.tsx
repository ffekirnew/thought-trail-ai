import { useParams } from 'react-router-dom';
import CollectionNoteDetail from '../../components/second-brain/CollectionNoteDetail';
import CollectionNoteDetailSkeleton from '../../components/second-brain/skeletons/CollectionNoteDetailSkeleton';
import { useGetCollectionNote } from '../../hooks/collections/notes';

const CollectionNotePage = () => {
  const { collectionSlug, noteId } = useParams();
  const { data, isLoading } = useGetCollectionNote(collectionSlug!, noteId!);

  if (isLoading) return <CollectionNoteDetailSkeleton />

  return <CollectionNoteDetail note={data!} collectionSlug={collectionSlug!} />
}

export default CollectionNotePage;
