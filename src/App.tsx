import { routes } from "@routes/routerconfig";
import { ConfigProvider } from "antd";
import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, LineElement, PointElement, Tooltip, registerables } from "chart.js";
import locale from 'antd/lib/locale/ko_KR';
import { useRoutes } from "react-router-dom";

ChartJS.register(...registerables);
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
  return (
    <ConfigProvider locale={locale}>
      {useRoutes(routes)}
    </ConfigProvider>
  );
}

export default App;
