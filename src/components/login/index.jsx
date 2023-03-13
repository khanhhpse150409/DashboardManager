import {
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
  ProConfigProvider,
} from "@ant-design/pro-components";
import { Button } from 'antd';

  import React, { useEffect} from "react";
  import 'firebase/auth';
  import { authService } from "../../Service/authService";
  import { useNavigate } from "react-router-dom";
  
  const Login = () => {
    const navigate = useNavigate();
      
    const signWithGoogle = async () => {
          await authService.loginWithGoogle();
          const role = localStorage.getItem("student");
         if (role === "Admin") {
          navigate("/Dashboard"); 
        } else {
          //sang trang home
          navigate("/");       
        }
    }
    
    useEffect(() => {
      localStorage.clear();
    })
    
    return (
      <>
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: 'white' }}>
          <LoginForm
            submitText="Đăng nhập"
            logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            title="Drashboard"
            subTitle="Chào mừng bạn đến với trang CWE"
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"Email"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email của bạn!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"Password"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu của bạn!",
                },
              ]}
            />
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                Nhớ mật khẩu
              </ProFormCheckbox>

              <Button onClick={signWithGoogle} style={{ float: "right" }}>
                Signin With Google
              </Button>
              {/* <SubmitButton>Đăng nhập</SubmitButton> */}
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    </>
  );
};

export default Login;
