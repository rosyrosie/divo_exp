import useStore from "@useStore";
import { Menu } from "antd";
import menus, { rootSubmenuKeys } from "@routes/menuconfig";
import { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";

const Layout = () => {
  const { corpId, corpName, selectedKey, setSelectedKey } = useStore();
  const [ openKeys, setOpenKeys ] = useState(['sales']);

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

  return (
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
  );
}

export default Layout;