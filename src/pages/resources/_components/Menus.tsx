import React, { useEffect, useState } from 'react';
import { ConfigProvider, Menu } from 'antd';
import clsx from 'clsx'
import { resources } from "@site/data/resources"
import styles from '../resource.module.css'
import Link from "@docusaurus/Link";

const linkComponent = <Link className={styles.resourceCardLink}/>;


function generateMenuItem(name) {
  return (
    <Menu.Item key={name}>
      {React.cloneElement(linkComponent, {href: `#${name}`})}
      {name}
    </Menu.Item>
  )
}

function generateSubMenu({items, name}) {
  return <Menu.SubMenu key={name} children={generateMenu(items)}
                       title={<span>{name}</span>}/>
}

function generateMenu(items) {
  return items.map(item => item.resources ? generateMenuItem(item.name) : generateSubMenu(item));
}

const menus = generateMenu(resources)


const Menus: React.FC = () => {
  const [collapsed] = useState(false);

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            darkItemBg: "#1b1b1d",
            darkSubMenuItemBg: "#242526"
          },
        },
      }}
    >
      <nav className={clsx(styles.sidebar, 'thin-scrollbar')}>
        <div style={{width: 256}}>
          <Menu mode="inline" inlineCollapsed={collapsed}>
            {menus}
          </Menu>
        </div>
      </nav>
    </ConfigProvider>
  );
};


export default Menus;
