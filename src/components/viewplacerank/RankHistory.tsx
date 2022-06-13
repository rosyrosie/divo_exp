import { VP_CHART_URL } from "@api";
import useAxios from "@useAxios";
import { applyColors, lineOptions } from "@utils/chartUtil";
import { Modal } from "antd";
import { Key, SetStateAction } from "react";
import { Chart } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const RankHistory = ({ keywords, visible, setVisible }: { keywords: Key[], visible: boolean, setVisible: React.Dispatch<SetStateAction<boolean>> }) => {
  const hideModal = () => setVisible(false);
  const { corpId } = useParams();
  const [ chart, loading, error ] = useAxios(
    VP_CHART_URL(corpId || '0', keywords[0] as string),
    null,
    'GET',
    [corpId, keywords],
    keywords.length > 0
  );

  return (
    <Modal 
      title="최근 순위 보기" 
      visible={visible} 
      onOk={hideModal} 
      onCancel={hideModal} 
      closable={false} 
      cancelButtonProps={{ 
        style: {
          display: 'none'
        } 
      }}
      width={1000}
    >
      <Chart type="line" options={lineOptions(false)} data={applyColors(chart?.rankGraph)} />
    </Modal>
  );
}

export default RankHistory;