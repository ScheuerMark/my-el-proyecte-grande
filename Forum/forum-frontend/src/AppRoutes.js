import Home from "./components/Home";
import PostDetails from "./components/PostDetails";
import TopicDetails from "./components/TopicDetails";
import Register from "./components/Register";
import Login from "./components/Login";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/PostDetail/:id',
    element: <PostDetails />
  },
  {
    path: '/Posts/:title',
    element: <TopicDetails />
  },
  {
    path: '/Register',
    element: <Register />
  },
  {
    path: '/Login',
    element: <Login />
  },
  
];

export default AppRoutes;