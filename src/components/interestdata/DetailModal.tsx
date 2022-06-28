import { ID_MODAL_QTY_URL, ID_MODAL_URL } from "@api";
import useAxios from "@useAxios";
import { modalQtyColumns, modalRankColumns, saveasCSV } from "@utils/tableUtil";
import { Button, Modal, Table } from "antd";
import { Dispatch, SetStateAction } from "react";

const DetailModal = ({ modalId, setModalId }: { modalId: string | null, setModalId: Dispatch<SetStateAction<string | null>> }) => {

  const [ modalData, mLoading, mError ] = useAxios(
    ID_MODAL_URL + modalId,
    null,
    'GET',
    [modalId],
    !!modalId
  );

  const [ searchQty, sLoading, sError ] = useAxios(
    ID_MODAL_QTY_URL + modalId,
    null,
    'GET',
    [modalId],
    !!modalId
  );

  return (
    <Modal
      title={mLoading ? '' : modalData?.name} 
      visible={!!modalId} 
      closable={false}
      onOk={() => setModalId(null)}
      onCancel={() => setModalId(null)}
      cancelButtonProps={{ 
        style: {
          display: 'none'
        } 
      }}
      width={'100%'}
      centered
    >
      <div className="modal_flex">
        <div className="modal_rank_box">
          <div className="table_title">
            주요 상권·지역·업종·점포
          </div>
          <div className="table_box">
            <Table columns={modalRankColumns} dataSource={modalData?.data} size="middle" loading={mLoading} bordered pagination={{position: ['topRight']}} />
            <div className="save_csv_box">
              <Button className="save_csv" onClick={() => saveasCSV(modalRankColumns, modalData?.data, `${modalData?.name} 주요 랭킹.xlsx`)}>CSV 다운로드</Button>
            </div>
          </div>
        </div>
        <div className="modal_qty_box">
          <div className="table_title">
            외식소비의도
          </div>
          <div className="table_box">
            <Table columns={modalQtyColumns} dataSource={searchQty?.data} size="middle" loading={sLoading} bordered pagination={{position: ['topRight']}} />
            <div className="save_csv_box">
              <Button className="save_csv" onClick={() => saveasCSV(modalQtyColumns, searchQty?.data, `${modalData?.name} 외식소비의도.xlsx`)}>CSV 다운로드</Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DetailModal;