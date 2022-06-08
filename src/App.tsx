import { routes } from "@routes/routerconfig";
import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { useRoutes } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = 'Pretendard';
ChartJS.defaults.plugins.legend.labels.usePointStyle = true;

const App = () => {
  return useRoutes(routes);
}

export default App;
