import { SA_RADAR_URL } from "@api";
import useAxios from "@useAxios";
import { applyRadarColors, radarOptions } from "@utils/chartUtil";
import { message } from "antd";
import { useEffect } from "react";
import { Chart } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const SalesRadar = () => {
  const { corpId } = useParams();
  const [ radarData, loading, error ] = useAxios(
    SA_RADAR_URL(corpId || '0'),
    null,
    'GET',
    [corpId],
    corpId !== undefined
  );

  const chartData = radarData?.radar;

  useEffect(() => {
    if(error) message.warning('error', 1.5);
  }, [error]);

  return (
    <div className="content">
      <div className="header">
      </div>
      <div className="data">
        <div className="radar_box">
          {chartData && <Chart type="radar" options={radarOptions} data={applyRadarColors(chartData)} />}
        </div>
      </div>
    </div>
  );
}

export default SalesRadar;