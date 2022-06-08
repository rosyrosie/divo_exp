import { CORPLIST_URL } from "@api";
import useAxios from "@useAxios";
import { Button, Card, Divider, List, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem('token');

  useEffect(() => {
    if(!token) navigate('/login');
  }, [token]);

  const [ corpList, loading, error ] = useAxios(
    CORPLIST_URL,
    null,
    'GET',
    []
  );

  const setCorp = (id: string, name: string) => {
    navigate(`/bid=${id}/review-blog`, { state: { corpName: name }});
  };

  const handleLogout = () => {
    localStorage.clear();
    token = null;
    navigate('/');
  }

  return (
    <>
      <div className="brand_box">
        {
          loading ? <Spin /> :
          <>
            <Divider orientation="left">브랜드 목록</Divider>
            <div className="brand_list">
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
                    <Card hoverable>{corp[1]}</Card>
                  </List.Item>
                )}
              />
            </div>
          </>
        }
        <div className="logout">
          <Button onClick={handleLogout}>로그아웃</Button>
        </div>
      </div>
    </>
  );
}

export default Home;