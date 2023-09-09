import { Note } from './KnowledgePage';
import KnowledgeDetail from '../../components/second-brain/KnowledgeDetail';

const AddNewNotePage = () => {
  const newNote: Note = { title: "", body: "", tags: [], id: 10 }
  return <KnowledgeDetail note={newNote} />
}

export default AddNewNotePage;
