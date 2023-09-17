import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/authentication/SignInPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import AuthenticationPage from "./pages/authentication/AuthenticationPage";
import SecondBrainPage from "./pages/second-brain/SecondBrainPage";
import ChatPage from "./pages/second-brain/ChatPage";
import JournalPage from "./pages/second-brain/JournalPage";
import JournalDetailPage from "./pages/second-brain/JournalDetailPage";
import AddNewJournalPage from "./pages/second-brain/AddNewJournalPage";
import CollectionsPage from "./pages/second-brain/CollectionsPage";
import CollectionDetailPage from "./pages/second-brain/CollectionDetailPage";
import CollectionNotePage from "./pages/second-brain/CollectionNotePage";
import AddNewCollectionNotePage from "./pages/second-brain/AddNewCollectionNotePage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <LandingPage /> },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        children: [
          { path: 'sign-in', element: <SignInPage /> },
          { path: 'register', element: <RegisterPage /> }
        ]
      },
      {
        path: 'everything',
        element: <SecondBrainPage />,
        children: [
          { index: true, element: <JournalPage /> },
          { path: 'journals', element: <JournalPage /> },
          { path: 'journals/:id', element: <JournalDetailPage /> },
          { path: 'journals/new', element: <AddNewJournalPage /> },

          { path: 'collections', element: <CollectionsPage /> },
          { path: 'collections/:collectionSlug', element: <CollectionDetailPage /> },
          { path: 'collections/:collectionSlug/notes/:noteId', element: <CollectionNotePage /> },
          { path: 'collections/:collectionSlug/notes/new', element: <AddNewCollectionNotePage /> },

          { path: 'chat', element: <ChatPage /> },
        ]
      }
    ]
  }
]);

export default router;
