import { notes } from './KnowledgePage';
import { useParams } from 'react-router-dom';
import KnowledgeDetail from '../../components/second-brain/KnowledgeDetail';

const KnowledgeDetailPage = () => {
  const { id } = useParams();
  const note = notes.filter(n => n.id === parseInt(id!))[0];

  return <KnowledgeDetail note={note} />
}

export default KnowledgeDetailPage;
