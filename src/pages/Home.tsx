import { BM_CORPLIST_URL, BM_TOGGLE_URL } from "@api";
import useAxios from "@useAxios";
import { Button, Card, Divider, List, message, Rate, Segmented, Tag } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type corpType = [
  number, string, string, string
];

const Home = () => {
  const navigate = useNavigate();
  const [ sortType, setSortType ] = useState<SegmentedValue>('등록일순');
  const [ trigger, setTrigger ] = useState(false);
  const sortId: Record<SegmentedValue, string> = {
    '등록일순': 'id',
    '가나다순': 'abc'
  };
  let token = localStorage.getItem('token');

  useEffect(() => {
    if(!token) navigate('/login');
  }, [token]);

  const [ corpList, loading, error ] = useAxios(
    BM_CORPLIST_URL + '?sortby=' + sortId[sortType],
    null,
    'GET',
    [sortType, trigger]
  );

  const setCorp = (id: number) => {
    navigate(`/bid=${id}/sales-qty`);
  };

  const handleLogout = () => {
    localStorage.clear();
    token = null;
    navigate('/');
  }

  const toggleBookmark = (id: number) => {
    axios.get(BM_TOGGLE_URL + id, {headers: {"Authorization": `Token ${token}`}}).then(() => setTrigger(t => !t));
  }

  useEffect(() => {
    if(error) message.warning('잠시 후 다시 시도해주세요', 1.5);
  }, [error]);

  return (
    <>
      <div className="brand_box">
        <Divider orientation="left">즐겨찾기</Divider>
        <div className="brand_list">
          {corpList && 
            <List 
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 4
              }}
              dataSource={corpList.corpList.yesBookmark}
              renderItem={(corp: corpType) => (
                <List.Item onClick={() => setCorp(corp[0])}>
                  <Card 
                    hoverable
                    bodyStyle={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    {corp[1]}
                    <span>
                      <Tag
                        color={corp[2] === 'linked' ? 'blue' : 'red'}
                        style={{
                          marginLeft: '6px'
                        }}
                      >
                        {corp[2] === 'linked' ? '연동' : '미연동'}
                      </Tag>
                      <span onClick={event => event.stopPropagation()}>
                        <Rate count={1} value={1} onChange={() => toggleBookmark(corp[0])} />
                      </span>
                    </span>
                  </Card>
                </List.Item>
              )}
            />
          }
        </div>
        <Divider orientation="left">브랜드 목록</Divider>
        <div className="brand_list">
          {corpList && 
            <List 
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 4
              }}
              dataSource={corpList.corpList.notBookmark}
              renderItem={(corp: corpType) => (
                <List.Item onClick={() => setCorp(corp[0])}>
                  <Card 
                    hoverable
                    bodyStyle={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    {corp[1]}
                    <span>
                      <Tag
                        color={corp[2] === 'linked' ? 'blue' : 'red'}
                        style={{
                          marginLeft: '6px'
                        }}
                      >
                        {corp[2] === 'linked' ? '연동' : '미연동'}
                      </Tag>
                      <span onClick={event => event.stopPropagation()}>
                        <Rate count={1} value={0} onChange={() => toggleBookmark(corp[0])} />
                      </span>
                    </span>
                  </Card>
                </List.Item>
              )}
            />
          }
        </div>
        <div className="sortby">
          <Segmented options={['등록일순', '가나다순']} value={sortType} onChange={setSortType} />
        </div>
        <div className="logout">
          <Button onClick={handleLogout}>로그아웃</Button>
        </div>
      </div>
    </>
  );
}

export default Home;