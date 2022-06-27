import { HomeOutlined } from "@ant-design/icons";
import { ID_URL } from "@api";
import useAxios from "@useAxios";
import { DatePicker, Input, message, Table } from "antd";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RangeValue } from "rc-picker/lib/interface";
import { dateToStringFormat, disabledDate } from "@utils/dateUtil";
import { frchRankColumns, frchScrollProps } from "@utils/tableUtil";

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
          <span className="menu_title">외식소비의도 분석</span>
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
          <Table columns={frchRankColumns} dataSource={tableData?.data} size="middle" bordered pagination={{ hideOnSinglePage: true, current: page }} onChange={pagination => setPage(pagination.current || 1)} loading={query && tLoading} scroll={frchScrollProps} />
        </div>
      </div>
    </div>
  );
};

export default FranchiseRank;