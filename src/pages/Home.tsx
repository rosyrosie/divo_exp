import { Card, Switch } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandHome from "@pages/BrandHome";

const Home = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  let initialMode = localStorage.getItem('isBrandMode');

  useEffect(() => {
    if(!token) navigate('/login');
  }, [token]);

  const [ isBrandMode, setIsBrandMode ] = useState(initialMode==='brand' ? true : false);

  useEffect(() => {
    localStorage.setItem('isBrandMode', isBrandMode ? 'brand' : 'trend');
  }, [isBrandMode]);

  return (
    <div className="home_box">
      <div className="switch">
        <Switch
          checked={isBrandMode}
          onChange={setIsBrandMode}
        />
      </div>
      <BrandHome isBrandMode={isBrandMode} />
      {!isBrandMode && 
        <div className="trend_box">
          <Card 
            hoverable 
            style={{ width: 240, textAlign: 'center', marginBottom: 12 }}
            onClick={() => navigate('/hot-trend')}
          >
            급등락 키워드
          </Card>
          <Card hoverable style={{ width: 240, textAlign: 'center', marginBottom: 12 }}>
            외식소비의도 분석
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