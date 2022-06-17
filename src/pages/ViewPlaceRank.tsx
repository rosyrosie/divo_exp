import { VP_RANK_URL } from "@api";
import RankHistory from "@components/viewplacerank/RankHistory";
import useAxios from "@useAxios";
import { Button, message, Table, Tag } from "antd";
import { SortOrder } from "antd/lib/table/interface";
import { Key, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type kwRankType = {
  keyword: string,
  view: number,
  place: number,
  viewDelta: number,
  placeDelta: number,
  searchAmount: number,
  type?: 'section' | 'category' | 'rival',
  key: string
};

const ViewPlaceRank = () => {
  const { corpId } = useParams();
  const [ rankData, loading, error ] = useAxios(
    VP_RANK_URL + corpId,
    null,
    'GET',
    [corpId]
  );
  const [ checkedKeys, setCheckedKeys ] = useState<Key[]>([]);
  const [ isModalVisible, setIsModalVisible ] = useState(false);

  const tableData = rankData ? [
    ...rankData.section.map((kwRank: kwRankType) => ({
      ...kwRank,
      type: 'section',
      key: kwRank.keyword
    })),
    ...rankData.category.map((kwRank: kwRankType) => ({
      ...kwRank,
      type: 'category',
      key: kwRank.keyword
    })),
    ...rankData.rival.map((kwRank: kwRankType) => ({
      ...kwRank,
      type: 'rival',
      key: kwRank.keyword
    }))
  ] : [];

  const columns = [
    {
      title: '키워드',
      dataIndex: 'keyword',
      key: 'keyword',
      width: '25%',
      filters: [
        {
          text: '상권 키워드',
          value: 'section' as const
        },
        {
          text: '업종 키워드',
          value: 'category' as const
        },
        {
          text: '경쟁 키워드',
          value: 'rival' as const
        }
      ],
      onFilter: (value: string | number | boolean, record: kwRankType) => record.type === value
    },
    {
      title: '최근 1개월 검색량',
      dataIndex: 'searchAmount',
      key: 'searchAmount',
      width: '25%',
      defaultSortOrder: 'descend' as SortOrder,
      sorter: (a: kwRankType, b: kwRankType) => a.searchAmount - b.searchAmount,
      sortDirections: ['descend'] as SortOrder[],
      render: (text: number) => text.toLocaleString()
    },
    {
      title: 'View 순위',
      dataIndex: 'view',
      key: 'view',
      width: '25%',
      sorter: (a: kwRankType, b: kwRankType) => a.view - b.view,
      render: (text: string, record: kwRankType) => {
        const sign = record.viewDelta >= 0 ? '+' : '';
        const tagColor = record.viewDelta > 0 ? "red" : record.viewDelta === 0 ? "" : "blue"; 
        return (
          <span className="rank_render">
            {text}위
            <Tag color={tagColor}>{sign}{record.viewDelta}</Tag>
          </span>
        );
      }
    },
    {
      title: 'Place 순위',
      dataIndex: 'place',
      key: 'place',
      width: '25%',
      sorter: (a: kwRankType, b: kwRankType) => a.place - b.place,
      render: (text: string, record: kwRankType) => {
        const sign = record.placeDelta >= 0 ? '+' : '';
        const tagColor = record.placeDelta > 0 ? "red" : record.placeDelta === 0 ? "" : "blue"; 
        return (
          <span className="rank_render">
            {text}위
            <Tag color={tagColor}>{sign}{record.placeDelta}</Tag>
          </span>
        );
      }
    }
  ];

  useEffect(() => {
    if(error) message.warning('error', 1.5);
  }, [error]);

  return (
    <>
      <div className="content">
        <div className="header">
        </div>
        <div className="cards">
          <Button type="primary" disabled={checkedKeys.length === 0} onClick={() => setIsModalVisible(true)}>
            최근 순위 보기({checkedKeys.length})
          </Button>
          <Table 
            columns={columns} 
            dataSource={tableData} 
            loading={loading}
            rowSelection={{
              onChange: (selectedRowKeys) => setCheckedKeys(selectedRowKeys)
            }}
            style={{
              marginTop: '24px'
            }}
            pagination={false}
          />
        </div>
      </div>
      <RankHistory keywords={checkedKeys} visible={isModalVisible} setVisible={setIsModalVisible} />
    </>
  );
}

export default ViewPlaceRank;