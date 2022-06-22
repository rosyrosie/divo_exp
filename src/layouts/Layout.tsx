import { Menu } from "antd";
import menus from "@routes/menuconfig";
import { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { CORPINFO_URL } from "@api";
import useAxios from "@useAxios";

const Layout = () => {
  const { corpId, dataId } = useParams();
  const [ corpInfo, loading , error ] = useAxios(
    CORPINFO_URL + corpId,
    null,
    'GET',
    [corpId],
    corpId !== undefined
  );

  let token = localStorage.getItem('token');

  useEffect(() => {
    if(!token) navigate('/login');
  }, [token]);

  const [ openKeys, setOpenKeys ] = useState<string[]>([]);
  const navigate = useNavigate();

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const onSelect = ({ key }: { key: string }) => {
    navigate(`/bid=${corpId}/${key}`);
  };
  
  return (
    <>
      <div className="menu">
        <div className="home">
          <HomeOutlined onClick={() => navigate('/')} />
          <div className="brand_name">{corpInfo?.corpName}</div>
        </div>
        <div className="menu_box">
          <Menu
            mode="inline"
            selectedKeys={[dataId || '']}
            openKeys={openKeys}
            onOpenChange={onOpenChange} 
            items={menus}
            onSelect={onSelect}
          />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Layout;