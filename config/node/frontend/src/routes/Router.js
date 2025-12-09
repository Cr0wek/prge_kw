import { createBrowserRouter } from "react-router-dom";
import { Home, ListOfItems, Services, Map, About } from "./LazyImports";
const routes = createBrowserRouter([
  {
    path: "/prge_kw/",
    element: <Home />,
  },
  {
    path: "/prge_kw/about",
    element: <About />,
  },
  {
    path: "/prge_kw/map",
    element: <Map />,
  },
  {
    path: "/prge_kw/services",
    element: <Services />,
  },
  {
    path: "/prge_kw/list",
    element: <ListOfItems />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);
export default routes;
