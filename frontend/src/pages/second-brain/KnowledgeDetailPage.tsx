import { useParams } from 'react-router-dom';
import KnowledgeDetail from '../../components/second-brain/KnowledgeDetail';
import { useGetNote } from '../../hooks/notes';
import KnowledgeDetailSkeleton from '../../components/second-brain/skeletons/KnowledgeDetailSkeleton';

const KnowledgeDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetNote(id!);

  if (isLoading) return <KnowledgeDetailSkeleton />

  return <KnowledgeDetail note={data?.data} />
}

export default KnowledgeDetailPage;
