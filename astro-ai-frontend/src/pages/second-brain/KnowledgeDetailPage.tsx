import { Box, HStack, Heading, VStack, Text, Flex, Button, Input } from '@chakra-ui/react';
import { Note, notes } from './KnowledgePage';
import { useNavigate, useParams } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import KnowledgeDetail from '../../components/second-brain/KnowledgeDetail';

const KnowledgeDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const note = notes.filter(n => n.id === parseInt(id!))[0];

  return <KnowledgeDetail note={note} />
}

export default KnowledgeDetailPage;
