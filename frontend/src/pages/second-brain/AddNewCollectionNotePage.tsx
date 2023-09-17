import { useParams } from "react-router-dom";
import CollectionNoteDetail from "../../components/second-brain/CollectionNoteDetail"

const AddNewCollectionNotePage = () => {
  const { collectionSlug } = useParams();

  return <CollectionNoteDetail note={undefined} collectionSlug={collectionSlug!} />
}

export default AddNewCollectionNotePage
