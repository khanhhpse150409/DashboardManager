import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import { ProLayout, PageContainer, SettingDrawer } from '@ant-design/pro-components';
import { Button, Descriptions, Result, Space, Statistic } from 'antd';
import { useState } from 'react';
import defaultProps from './defaultProps';
const content = (<Descriptions size="small" column={2}>
    <Descriptions.Item label="Founder">Zhang San</Descriptions.Item>
    <Descriptions.Item label="Contact information">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="Creation time">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="Update time">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="Remark">Gucui Road, West Lake District, Hangzhou City, Zhejiang Province, China</Descriptions.Item>
  </Descriptions>);
const Home = () => {
    const logout = () => {
      localStorage.clear();
      window.loaction.reload();
    }
    const [settings, setSetting] = useState({ fixSiderbar: true });
    const [pathname, setPathname] = useState('/welcome');
    return (<div id="test-pro-layout" style={{
            height: '100vh',
        }}>
      <ProLayout {...defaultProps} location={{
            pathname,
        }} waterMarkProps={{
            content: 'Pro Layout',
        }} menuFooterRender={(props) => {
            return (<a style={{
                    lineHeight: '48rpx',
                    display: 'flex',
                    height: 48,
                    color: 'rgba(255, 255, 255, 0.65)',
                    alignItems: 'center',
                }} href="https://preview.pro.ant.design/dashboard/analysis" target="_blank" rel="noreferrer">
              <img alt="pro-logo" src="https://procomponents.ant.design/favicon.ico" style={{
                    width: 16,
                    height: 16,
                    margin: '0 16px',
                    marginInlineEnd: 10,
                }}/>
              {!(props === null || props === void 0 ? void 0 : props.collapsed) && 'Preview Pro'}
            </a>);
        }} onMenuHeaderClick={(e) => console.log(e)} menuItemRender={(item, dom) => (<a onClick={() => {
                setPathname(item.path || '/welcome');
            }}>
            {dom}
          </a>)} avatarProps={{
            icon: <UserOutlined />,
        }} {...settings}>
        <PageContainer content={content} tabList={[
            {
                tab: 'Basic Information',
                key: 'base',
            },
            {
                tab: 'Details',
                key: 'info',
            },
        ]} extraContent={<Space size={24}>
              <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />}/>
              <Statistic title="Unmerged" value={93} suffix="/ 100"/>
            </Space>} extra={[
            <Button key="3" onClick={logout}>Logout</Button>,
            <Button key="2">Operate</Button>,
            <Button key="1" type="primary">
              Main operation
            </Button>,
        ]} footer={[
            <Button key="3">Reset</Button>,
            <Button key="2" type="primary">
              Submit
            </Button>,
        ]}>
          <div style={{
            height: '120vh',
            minHeight: 600,
        }}>
            <Result status="404" style={{
            height: '100%',
            background: '#fff',
        }} title="Hello World" subTitle="Sorry, you are not authorized to access this page." extra={<Button type="primary">Back Home</Button>}/>
          </div>
        </PageContainer>
      </ProLayout>
      <SettingDrawer pathname={pathname} getContainer={() => document.getElementById('test-pro-layout')} settings={settings} onSettingChange={(changeSetting) => {
            setSetting(changeSetting);
        }} disableUrlParams/>
    </div>);
};

export default Home