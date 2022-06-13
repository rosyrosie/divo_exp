import { CORPLIST_URL } from "@api";
import useAxios from "@useAxios";
import { Button, Card, Divider, List, message, Rate, Segmented, Tag } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [ sortType, setSortType ] = useState<SegmentedValue>('등록일순');
  const sortId: Record<SegmentedValue, string> = {
    '등록일순': 'id',
    '가나다순': 'abc'
  };
  let token = localStorage.getItem('token');

  useEffect(() => {
    if(!token) navigate('/login');
  }, [token]);

  const [ corpList, loading, error ] = useAxios(
    CORPLIST_URL + '?sortby=' + sortId[sortType],
    null,
    'GET',
    [sortType]
  );

  const setCorp = (id: string, name: string) => {
    navigate(`/bid=${id}/sales-qty`);
  };

  const handleLogout = () => {
    localStorage.clear();
    token = null;
    navigate('/');
  }

  useEffect(() => {
    if(error) message.warning('잠시 후 다시 시도해주세요', 1.5);
  }, [error]);

  return (
    <>
      <div className="brand_box">
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
              dataSource={corpList.corpList}
              renderItem={(corp: any[]) => (
                <List.Item onClick={() => setCorp(corp[0], corp[1])}>
                  <Card 
                    hoverable
                    bodyStyle={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>
                      {corp[1]}
                      <Tag
                        color={corp[2] === 'linked' ? 'blue' : 'red'}
                        style={{
                          marginLeft: '6px'
                        }}
                      >
                        {corp[2] === 'linked' ? '연동' : '미연동'}
                      </Tag>
                    </span>
                    <Rate count={1} />
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