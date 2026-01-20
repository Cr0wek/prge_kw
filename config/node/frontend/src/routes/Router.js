import { createHashRouter } from "react-router-dom";
import {
  Home,
  ListOfItems,
  Services,
  Map,
  About,
  AddEntry,
} from "./LazyImports";

const routes = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/map",
    element: <Map />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  // Dodajemy parametr :type, aby rozróżnić /list/events, /list/artists itp.
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
