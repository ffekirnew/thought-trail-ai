import { useParams } from "react-router-dom";
import CollectionNoteDetail from "../../components/second-brain/CollectionNoteDetail";
import useNewCollectionNoteStore from "../../state/useNewCollectionNoteStore";

const AddNewCollectionNotePage = () => {
  const { collectionSlug } = useParams();
  const note = useNewCollectionNoteStore((s) => s.note);

  return <CollectionNoteDetail note={note} collectionSlug={collectionSlug!} />;
};

export default AddNewCollectionNotePage;
