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

  import React, {useState, useEffect} from "react";
  import Dashboard from "../../components/dashboard";
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import { authService } from "../../Service/authService";
  import { useNavigate } from "react-router-dom";
  const iconStyles = {
    marginInlineStart: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };
  
  const Login = () => {
    const [value, setValue] = useState('')
    const navigate = useNavigate();
      
    const signWithGoogle = async () => {
          await authService.loginWithGoogle();
          const role = localStorage.getItem("student");
         if (role === "Admin") {
          navigate("/Dashboard"); 
        } else {
          navigate("/Home"); 
          console.log("Tôi là user");
          
        }
    }
    
    useEffect(() => {
      localStorage.clear();
      window.loaction.reload();
    })
    
    return (
      <>
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: 'white' }}>
          <LoginForm
            logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            title="Drashboard"
            subTitle="Chào mừng bạn đến với trang CWE" 
            // message='Submit'
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
            <div style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                Nhớ mật khấu
              </ProFormCheckbox>
              
              <button onClick={signWithGoogle} style={{float: 'right',}}
              >
                Signin With Google
              </button>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
      </>
  
    );
        }

  export default Login;