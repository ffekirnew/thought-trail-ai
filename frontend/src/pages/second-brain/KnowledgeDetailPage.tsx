import { useParams } from 'react-router-dom';
import KnowledgeDetail from '../../components/second-brain/KnowledgeDetail';
import useGetNote from '../../hooks/useGetNote';
import { Text } from '@chakra-ui/react';

const KnowledgeDetailPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetNote(id!);

  if (isLoading) return <Text>Loading...</Text>

  return <KnowledgeDetail note={data?.data} />
}

export default KnowledgeDetailPage;
