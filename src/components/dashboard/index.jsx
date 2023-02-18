import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import {
  ProLayout,
  PageContainer,
  SettingDrawer,
} from "@ant-design/pro-components";
import { Button, Descriptions, Result, Space, Statistic } from "antd";
import { useState } from "react";
import defaultProps from "./defaultProps";
import { loginGoogle } from "../../Service/Service";
const Authorization = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlYjMxMjdiMjRjZTg2MDJjODEyNDUxZThmZTczZDU4MjkyMDg4N2MiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVmnDqm4gTmd1eeG7hW4gVGhhbmgiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNXB6TXVocmlqVGZZakdxb19mazVTdjJCT2NReGNQSXhjWjhlMHRPUT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9yZWFjdC1hdXRoLWJjMGE0IiwiYXVkIjoicmVhY3QtYXV0aC1iYzBhNCIsImF1dGhfdGltZSI6MTY3NjcwODU3MywidXNlcl9pZCI6ImRVdXp2WWRZVm1YUk1EblpCNVBrOXlaRXg4MzMiLCJzdWIiOiJkVXV6dllkWVZtWFJNRG5aQjVQazl5WkV4ODMzIiwiaWF0IjoxNjc2NzE2NjgwLCJleHAiOjE2NzY3MjAyODAsImVtYWlsIjoidGhhbmh2aWVubmd1eWVuMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTc3NDI5NzMzMDMxMTc0OTQ0ODEiXSwiZW1haWwiOlsidGhhbmh2aWVubmd1eWVuMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.FX9uPcMTNV9EJMQ1SV6AyelyA6qrpSQFQOwbT4fltqc5AyoEy4esdwSGJuhaFws5aj0rsDb3WW5-JnNyfCUDUVZIdYLxPNbU6m13brmpXqYiGumTV2W2TTj9G0Cmz9lsgBVeparqm2PXK8qGZvmEzfQWvjyki2j-1RG4rGO8zrmRSbj07bHRvL_FnEciyDMYmWjVgTlnYZFwnqCN6mkDK5njf_QjpTCLArfieodCoEG7jK_GOpkY-mESx6HYGkVNkvyCk1bceKQRQQKB47x1_VD4g25wuOANoo8FpO38vm2NJ4TmyNG0-9KIPcm2lB2T-zr4j7bIrmB2bGlt2AlRdA"

const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="Founder">Zhang San</Descriptions.Item>
    <Descriptions.Item label="Contact information">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="Creation time">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="Update time">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="Remark">
      Gucui Road, West Lake District, Hangzhou City, Zhejiang Province, China
    </Descriptions.Item>
  </Descriptions>
);
const Dashboard = () => {
  const logout = () => {
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
        {...defaultProps}
        location={{
          pathname,
        }}
        waterMarkProps={{
          content: "Pro Layout",
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
          tabList={[
            {
              tab: "Basic Information",
              key: "base",
            },
            {
              tab: "Details",
              key: "info",
            },
          ]}
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
            <Button key="2" onClick={() => {
              loginGoogle(Authorization)
            }}>
              Test
            </Button>,
            <Button key="1" type="primary">
              Main operation
            </Button>,
          ]}
          footer={[
            <Button key="3">Reset</Button>,
            <Button key="2" type="primary">
              Submit
            </Button>,
          ]}
        >
          <div
            style={{
              height: "120vh",
              minHeight: 600,
            }}
          >
            <Result
              status="404"
              style={{
                height: "100%",
                background: "#fff",
              }}
              title="Hello World"
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary">Back Home</Button>}
            />
          </div>
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
