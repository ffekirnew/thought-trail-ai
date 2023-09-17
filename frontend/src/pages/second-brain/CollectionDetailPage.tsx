import { useParams } from 'react-router-dom';
import CollectionDetail from '../../components/second-brain/CollectionDetail';
import useGetCollectionBySlug from '../../hooks/collections/ueGetCollectionBySlug';
import CollectionDetailSkeleton from '../../components/second-brain/skeletons/CollectionDetailSkeleton';

const CollectionDetailPage = () => {
  const { collectionSlug } = useParams();
  const { data, isLoading } = useGetCollectionBySlug(collectionSlug!);

  if (isLoading) return <CollectionDetailSkeleton />

  return <CollectionDetail collection={data?.data!} />
}

export default CollectionDetailPage;
