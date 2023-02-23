import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import {
  ProLayout,
  PageContainer,
  SettingDrawer,
} from "@ant-design/pro-components";
import { Button, Descriptions, Result, Space, Statistic } from "antd";
import { useState } from "react";
import defaultProps from "./defaultProps";
import { useNavigate } from "react-router-dom";
import Container from "../container";

const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="Team">SWD</Descriptions.Item>
    <Descriptions.Item label="Contact information">
      <a>0914730992</a>
    </Descriptions.Item>
    <Descriptions.Item label="Creation time">2023-02-02</Descriptions.Item>
    <Descriptions.Item label="Update time">2023-23-02</Descriptions.Item>
    <Descriptions.Item label="Remark">
      Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ
      Chí Minh 700000
    </Descriptions.Item>
  </Descriptions>
);
const Dashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    localStorage.clear();
    window.loaction.reload();
  };
  const [settings, setSetting] = useState({ fixSiderbar: true });
  const [pathname, setPathname] = useState("/welcome");
  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        title="Dashboard"
        {...defaultProps}
        location={{
          pathname,
        }}
        waterMarkProps={{
          content: "Pro Layout",
          fontSize: "0",
        }}
        menuFooterRender={(props) => {
          return (
            <a
              style={{
                lineHeight: "48rpx",
                display: "flex",
                height: 48,
                color: "rgba(255, 255, 255, 0.65)",
                alignItems: "center",
              }}
              href="https://preview.pro.ant.design/dashboard/analysis"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="pro-logo"
                src="https://procomponents.ant.design/favicon.ico"
                style={{
                  width: 16,
                  height: 16,
                  margin: "0 16px",
                  marginInlineEnd: 10,
                }}
              />
              {!(props === null || props === void 0
                ? void 0
                : props.collapsed) && "Preview Pro"}
            </a>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || "/welcome");
            }}
          >
            {dom}
          </a>
        )}
        avatarProps={{
          icon: <UserOutlined />,
        }}
        {...settings}
      >
        <PageContainer
          content={content}
          extraContent={
            <Space size={24}>
              <Statistic
                title="Feedback"
                value={1128}
                prefix={<LikeOutlined />}
              />
              <Statistic title="Unmerged" value={93} suffix="/ 100" />
            </Space>
          }
          extra={[
            <Button key="3" onClick={logout}>
              Logout
            </Button>,
          ]}
          footer={[
            <Button key="3">Reset</Button>,
            <Button key="2" type="primary">
              Submit
            </Button>,
          ]}
        >
          {/* <ListStudent /> */}
          <Container pathname={pathname} />
        </PageContainer>
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        getContainer={() => document.getElementById("test-pro-layout")}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams
      />
    </div>
  );
};

export default Dashboard;
