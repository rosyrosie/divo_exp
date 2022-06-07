import useStore from "@useStore";
import { Menu } from "antd";
import menus, { rootSubmenuKeys } from "@routes/menuconfig";
import { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Layout = () => {
  const { corpId, corpName, selectedKey, setSelectedKey } = useStore();
  const [ openKeys, setOpenKeys ] = useState(['review']);
  const navigate = useNavigate();

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if(latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    }
    else{
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onSelect = ({ key }: { key: string }) => {
    setSelectedKey(key);
  };
  
  useEffect(() => {
    navigate(`/bid=${corpId}/${selectedKey}`);
  }, [selectedKey]);

  return (
    <>
      <div className="menu">
        <div className="home">
          <HomeOutlined />
          <div className="brand_name">{corpName}</div>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[ selectedKey ]}
          openKeys={openKeys}
          onOpenChange={onOpenChange} 
          items={menus}
          onSelect={onSelect}
        />
      </div>
      <Outlet />
    </>
  );
}

export default Layout;