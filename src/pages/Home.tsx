import { CORPLIST_URL } from "@api";
import useAxios from "@useAxios";
import { Card, Divider, List, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "@useStore";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { corpId, setCorpId } = useStore();

  useEffect(() => {
    if(!token) navigate('/login');
  }, [token]);

  const [ corpList, loading, error ] = useAxios(
    CORPLIST_URL,
    null,
    'GET',
    []
  );

  const setCorp = (id: string) => {
    setCorpId(id);
    navigate('/bid=' + id);
  }

  return (
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
                <List.Item onClick={() => setCorp(corp[0])}>
                  <Card hoverable>{corp[1]}</Card>
                </List.Item>
              )}
            />
          </div>
        </>
      }
    </div>
  );
}

export default Home;