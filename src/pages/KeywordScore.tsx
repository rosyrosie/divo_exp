import { KW_SCORE_URL } from "@api";
import useAxios from "@useAxios";
import { Segmented, Table } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import { SortOrder } from "antd/lib/table/interface";
import { useState } from "react";
import { useParams } from "react-router-dom";

type scoreType = {
  keyword: string,
  amount: number,
  EPS?: string,
  VPS?: string,
  viewRI?: number,
  placeRI?: number
};

const KeywordScore = () => {
  const [ keywordType, setKeywordType ] = useState<SegmentedValue>('브랜드');
  const { corpId } = useParams();
  const baseColumns = [
    {
      title: '키워드',
      dataIndex: 'keyword',
      key: 'keyword',
      width: '25%'
    },
    {
      title: '최근 6개월 검색량',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: number) => text.toLocaleString(),
      width: '25%',
      defaultSortOrder: 'descend' as SortOrder,
      sorter: (a: scoreType, b: scoreType) => a.amount - b.amount,
      sortDirections: ['descend'] as SortOrder[],
    },
  ];

  const brandColumns = [
    {
      title: 'Brand EPS',
      dataIndex: 'EPS',
      key: 'EPS',
      width: '25%',
      sorter: (a: scoreType, b: scoreType) => parseFloat(a?.EPS || '0') - parseFloat(b?.EPS || '0'),
      sortDirections: ['descend'] as SortOrder[],
    },
    {
      title: 'Brand VPS',
      dataIndex: 'VPS',
      key: 'VPS',
      width: '25%',
      sorter: (a: scoreType, b: scoreType) => parseFloat(a?.VPS || '0') - parseFloat(b?.VPS || '0'),
      sortDirections: ['descend'] as SortOrder[],
    }
  ];

  const relColumns = [
    {
      title: 'View RI',
      dataIndex: 'viewRI',
      key: 'viewRI',
      width: '25%',
      sorter: (a: scoreType, b: scoreType) => (a?.viewRI || 0) - (b?.viewRI || 0),
      sortDirections: ['descend'] as SortOrder[],
    },
    {
      title: 'Place RI',
      dataIndex: 'placeRI',
      key: 'placeRI',
      width: '25%',
      sorter: (a: scoreType, b: scoreType) => (a?.placeRI || 0) - (b?.placeRI || 0),
      sortDirections: ['descend'] as SortOrder[],
    }
  ];

  const [ tableData, loading, error ] = useAxios(
    KW_SCORE_URL(corpId || '0'),
    null,
    'GET',
    [corpId],
    corpId !== undefined
  );

  const typeId: Record<SegmentedValue, string> = {
    '브랜드': 'brand',
    '상권': 'section',
    '업종': 'category'
  };

  const columns = [...baseColumns, ...(keywordType === '브랜드' ? brandColumns : relColumns)];

  return (
    <div className="content">
      <div className="header">
        <Segmented options={['브랜드', '상권', '업종']} value={keywordType} onChange={setKeywordType} />
      </div>
      <div className="cards">
        <Table
          columns={columns}
          dataSource={tableData?.[typeId[keywordType]]}
          loading={loading}
          pagination={{
            hideOnSinglePage: true
          }}
        />
      </div>
    </div>
  );
}

export default KeywordScore;