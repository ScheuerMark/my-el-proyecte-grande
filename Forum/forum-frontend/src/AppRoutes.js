import Home from "./components/Home/Home";
import { PostDetails } from "./components/PostDetails/PostDetails";
import TopicDetails from "./components/TopicDetails/TopicDetails";
import Register from "./components/Signing/Register";
import Login from "./components/Signing/Login";
import { Search } from "./components/Layout/Search";

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
  {
    path: '/Search/:searchPhrase',
    element: <Search />
  },
  
];

export default AppRoutes;