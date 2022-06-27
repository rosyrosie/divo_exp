import { HomeOutlined } from "@ant-design/icons";
import { ID_URL } from "@api";
import useAxios from "@useAxios";
import { Button, Input, message, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { frchRankColumns, frchScrollProps, saveasCSV } from "@utils/tableUtil";

const FranchiseRank = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  const [ query, setQuery ] = useState('');
  const [ page, setPage ] = useState(1);

  const [ tableData, tLoading, tError ] = useAxios(
    ID_URL,
    {
      query
    },
    'POST',
    [query],
    query !== ''
  );

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <div className="franchise_rank">
      <div className="header">
        <span className="header_title">
          <HomeOutlined onClick={() => navigate('/')} />
          <span className="menu_title">프랜차이즈 지점 순위</span>
        </span>
        <span className="spread">
          <Search 
            placeholder="브랜드 검색(3자 이상)"
            style={{
              width: 240
            }}
            onSearch={value => value.length > 2 ? setQuery(value) : message.error('3자 이상 검색해주세요', 1.5) }
          />
        </span>
      </div>
      <div className="body">
        <div className="table">
          <Table 
            columns={frchRankColumns} 
            dataSource={tableData?.data} 
            size="middle" 
            bordered 
            pagination={{ hideOnSinglePage: true, current: page, position: ['topRight'] }} 
            onChange={pagination => setPage(pagination.current || 1)} 
            loading={query && tLoading} 
            scroll={frchScrollProps}
          />
          <div className="save_csv_box">
            <Button className="save_csv" onClick={() => saveasCSV(frchRankColumns, tableData?.data, `${query} 지점 순위.xlsx`)}>CSV 다운로드</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranchiseRank;