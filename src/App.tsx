import { routes } from "@routes/routerconfig";
import { useRoutes } from "react-router-dom";

const App = () => {
  return useRoutes(routes);
}

export default App;
