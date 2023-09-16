import { useParams } from 'react-router-dom';
import CollectionDetail from '../../components/second-brain/CollectionDetail';
import useGetCollectionBySlug from '../../hooks/collections/ueGetCollectionBySlug';

const CollectionDetailPage = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetCollectionBySlug(slug!);

  if (isLoading) return <p>Loading...</p>

  return <CollectionDetail collection={data?.data!} />
}

export default CollectionDetailPage;
