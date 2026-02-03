import { createHashRouter } from "react-router-dom";
import { Home, ListOfItems, Services, Map, AddEntry } from "./LazyImports";

const routes = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/map",
    element: <Map />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/list/:type",
    element: <ListOfItems />,
  },
  {
    path: "/addentry/:type",
    element: <AddEntry />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

export default routes;
