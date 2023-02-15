import {
    AlipayCircleOutlined,
    LockOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
  } from '@ant-design/icons';
  import {
    LoginForm,
    ProFormCheckbox,
    ProFormText,
    ProConfigProvider,
  } from '@ant-design/pro-components';
  import { Space } from 'antd';
  import { auth, provider } from "./config";
  import React, {useState, useEffect} from "react";
  import {signInWithPopup} from "firebase/auth";
  import Dashboard from "../dashboard";
  
  
  const iconStyles = {
    marginInlineStart: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };
  
  
  const Login = () => {
    const [value, setValue] = useState('')
    
    const handleClick = () => {
      signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
    })
    
    }
    
    useEffect(() => {
    setValue(localStorage.getItem('email'))
    })
    return (
      <>
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: 'white' }}>
          <LoginForm
            logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            title="Drashboard"
            subTitle="Chào mừng bạn đến với trang quản lý"
            // message='Submit'
            actions={
              <Space>
                Liên hệ
                <AlipayCircleOutlined style={iconStyles} />
                <TaobaoCircleOutlined style={iconStyles} />
                <WeiboCircleOutlined style={iconStyles} />
              </Space>
            }
            onFinish={handleClick}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'Email'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập email của bạn!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'Password'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu của bạn!',
                },
              ]}
            />
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                Nhớ mật khấu
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                Signin With Google
              </a>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
      <div>
              {value?<Dashboard/>:
              <button onClick={handleClick}>Signin With Google</button>
              }
          </div>
      </>
    );
  };
  export default Login
  