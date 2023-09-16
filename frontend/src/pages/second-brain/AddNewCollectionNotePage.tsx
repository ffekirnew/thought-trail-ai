import { useParams } from "react-router-dom";
import CollectionNoteDetail from "../../components/second-brain/CollectionNoteDetail"

const AddNewCollectionNotePage = () => {
  const { id } = useParams();
  return <CollectionNoteDetail note={undefined} />
}

export default AddNewCollectionNotePage
