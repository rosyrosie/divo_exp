import { Card, Switch } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandHome from "@pages/BrandHome";
import useAxios from "@useAxios";
import { CHECK_USER_URL } from "@api";

const Home = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  let initialMode = localStorage.getItem('isBrandMode');

  useEffect(() => {
    if(!token) navigate('/login');
  }, [token]);
  
  const [ sysAuth, _, __] = useAxios(
    CHECK_USER_URL,
    null,
    'GET',
    []
  );

  const [ isBrandMode, setIsBrandMode ] = useState(!sysAuth?.isCorp || initialMode==='brand' ? true : false);

  useEffect(() => {
    localStorage.setItem('isBrandMode', isBrandMode ? 'brand' : 'trend');
  }, [isBrandMode]);

  return (
    <div className="home_box">
      {<div className="switch">
        {sysAuth?.isCorp && <Switch
          checked={isBrandMode}
          onChange={setIsBrandMode}
        />}
      </div>}
      <BrandHome isBrandMode={isBrandMode} />
      {!isBrandMode && 
        <div className="trend_box">
          <Card 
            hoverable 
            style={{ width: 240, textAlign: 'center', marginBottom: 12 }}
            onClick={() => navigate('/hot-trend')}
          >
            급등락 데이터
          </Card>
          <Card 
            hoverable 
            style={{ width: 240, textAlign: 'center', marginBottom: 12 }}
            onClick={() => navigate('/interest-data')}
          >
            외식소비의도 분석
          </Card>
          <Card 
            hoverable 
            style={{ width: 240, textAlign: 'center', marginBottom: 12 }}
            onClick={() => navigate('/frch-rank')}
          >
            프랜차이즈 지점 순위
          </Card>
          <Card 
            hoverable 
            style={{ width: 240, textAlign: 'center', marginBottom: 12 }}
            onClick={() => window.open("https://map.divo.kr", "_blank", "noopener, noreferrer")}
          >
            전국 상권 분석
          </Card>
        </div>
      }
    </div>
  );
};

export default Home;