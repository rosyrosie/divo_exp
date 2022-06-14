import { VP_CHART_URL } from "@api";
import useAxios from "@useAxios";
import { applyColors, lineOptions } from "@utils/chartUtil";
import { Modal, Tabs } from "antd";
import { Key, SetStateAction } from "react";
import { Chart } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const RankHistory = ({ keywords, visible, setVisible }: { keywords: Key[], visible: boolean, setVisible: React.Dispatch<SetStateAction<boolean>> }) => {
  const hideModal = () => setVisible(false);
  const { corpId } = useParams();
  const [ chart, loading, error ] = useAxios(
    VP_CHART_URL,
    {
      corpId,
      keywords
    },
    'POST',
    [corpId, keywords],
    keywords.length > 0
  );
  const { TabPane } = Tabs;

  return (
    <Modal  
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
      <Tabs defaultActiveKey="view">
        <TabPane tab="VIEW 순위" key="view">
          {chart && <Chart type="line" options={lineOptions(false, true)} data={applyColors(chart?.viewRankGraph)} />}
        </TabPane>
        <TabPane tab="Place 순위" key="place">
          {chart && <Chart type="line" options={lineOptions(false, true)} data={applyColors(chart?.placeRankGraph)} />}
        </TabPane>
      </Tabs>
    </Modal>
  );
}

export default RankHistory;