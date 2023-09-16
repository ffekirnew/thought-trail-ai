import { useParams } from 'react-router-dom';
import JournalDetail from '../../components/second-brain/JournalDetail';
import JournalDetailSkeleton from '../../components/second-brain/skeletons/JournalDetailSkeleton';
import { useGetJournal } from '../../hooks/journals';

const JournalDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetJournal(id!);

  if (isLoading) return <JournalDetailSkeleton />

  return <JournalDetail journal={data?.data} />
}

export default JournalDetailPage;
