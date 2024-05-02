import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  useLocation,
  useParams
} from "react-router-dom";
import CartContainer from '../Views/CartContainer';
import CartSelected from '../Views/SelectedItem';
import Login from '../Views/Login';
import SignUP from '../Views/SignUp';
import AddSellPost from '../Views/AddSellPost';
import ChatsPage from '../Views/ChatsPage';
import Navbar from '../Component/Navbar';
import PageNotFound from '../Views/PageNotFound';
import CategoryNavbar from '../Component/Category-Navbar';
import SmallNavbar from '../Component/SmallNavbar';
import { useEffect, useState } from "react";
import Loader from "../Views/Loader";
import { useDispatch, useSelector } from "react-redux";
import PasswordResetPage from '../Views/ResetPassPage';
import { checkUser, logout } from "./mongoDb";
import { removeUser } from "../store/userInfoSlice";

const router = createBrowserRouter([
  {
    path: "*",
    element: <PageNotFound />
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />
      },
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/item/:id",
            element: <CartSelected />,
          },
          {
            path: "/chats/:pdtOwnerId",
            element: <ChatsPage />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <SignUP />,
          },
          {
            path: "/addsellpost",
            element: <AddSellPost />,
          },
          {
            path: "/prp",
            element: <PasswordResetPage />,
          }
        ]
      }
    ]
  }
]);

function MainLayout() {

  const dispatch = useDispatch();

  useEffect(() => {
    getUser();
  }, [window.location.pathname])

  const getUser = async () => {
    const result = await checkUser();

    if (!result.uid) {
      dispatch(removeUser());
    };
  };

  return (
    <Outlet />
  );
};

function Layout() {
  const { pathname } = useLocation();
  const { pdtOwnerId } = useParams();
  const res = useSelector(res => res.userSlice.userInfo);
  const navigate = useNavigate();

  const { user } = res;

  useEffect(() => {
    checkPaths();
  }, [pathname, user]);

  async function checkPaths() {

    if (user) {

      if (pathname == '/login' || pathname == '/prp' || pathname == '/signup' || pathname == '/passresetpage') {
        navigate('/');
      };

    } else {

      if (pathname == '/addsellpost' || pathname == `/chats/${pdtOwnerId}`) {
        navigate('/');
      };

    };

  };

  return (
    <div>
      <SmallNavbar userData={res} />
      <Outlet />
    </div>
  );
};

function MainPage() {

  return (
    <div>
      <Navbar />
      <CategoryNavbar />
      <CartContainer />
    </div>
  )
};

function Router() {
  return <RouterProvider router={router} />
};

export default Router;