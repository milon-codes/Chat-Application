import { createBrowserRouter } from "react-router-dom";

// Layout
import RootLayout from "../components/RootLayout";

// Route Guards
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

// Protected Pages
import Profile from "../pages/Profile";
import Chat from "../pages/Chat";
import ChatWindow from "../pages/ChatWindow";
import FriendManager from "../pages/FriendManager";
import BlockList from "../pages/BlockList";

// Other Pages
import UserProfileView from "../components/UserProfileView";
import LegalPage from "../components/LegalPage";
import NotFound from "../components/NotFound";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // Home
      {
        path: "/",
        element: <Home />,
      },

      // Public Routes
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
        ],
      },

      // Protected Routes
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/profile/:uid",
            element: <UserProfileView />,
          },
          {
            path: "/chat",
            element: <Chat />,
            children: [
              {
                path: ":uid",
                element: <ChatWindow />,
              },
            ],
          },
          {
            path: "/friends",
            element: <FriendManager />,
          },
          {
            path: "/blocked-users",
            element: <BlockList />,
          },
        ],
      },

      // Legal Routes
      {
        path: "/privacy",
        element: <LegalPage />,
      },
      {
        path: "/terms",
        element: <LegalPage />,
      },

      // 404
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);