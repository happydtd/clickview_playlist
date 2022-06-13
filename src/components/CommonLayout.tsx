import { Layout, Menu, Typography} from 'antd';
import { UserOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import 'antd/dist/antd.min.css';
import './CommonLayout.css'

const { Header, Content, Sider } = Layout;

interface ParentCompProps {
  children?: React.ReactNode;
}


export default function CommonLayout({children}:ParentCompProps) {

  const menuItems = [
        {
            key: 'playlist',
            icon: <UserOutlined />,
            label: (
              <Link to="/playlist">PlayList</Link>
            ),
        },
        {
            key: 'video',
            icon: <UserOutlined />,
            label: (
              <Link to="/video">Video</Link>
            ),
        },
    ];

  return (
    <>
      {
        <Layout>
        <Header className="header" >
          <Typography style={{color:'white'}}>ClickView</Typography>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items ={menuItems}/>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      }
    </>

  )
}
