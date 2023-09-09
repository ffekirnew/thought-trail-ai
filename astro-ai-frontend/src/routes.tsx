import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import GlobalSearchPage from "./pages/GlobalSearchPage";
import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/authentication/SignInPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import AuthenticationPage from "./pages/authentication/AuthenticationPage";
import SecondBrainPage from "./pages/second-brain/SecondBrainPage";
import KnowledgePage from "./pages/second-brain/KnowledgePage";
import KnowledgeDetailPage from "./pages/second-brain/KnowledgeDetailPage";
import AddNewNotePage from "./pages/second-brain/AddNewNotePage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    // navigate to one of the children

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
      { path: 'chat', element: <GlobalSearchPage /> },
      {
        path: 'everything',
        element: <SecondBrainPage />,
        children: [
          { path: '', element: <KnowledgePage /> },
          { path: 'notes/:id', element: <KnowledgeDetailPage /> },
          { path: 'notes/new', element: <AddNewNotePage /> }
        ]
      }
    ]
  }
]);

export default router;
