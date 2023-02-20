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
  import {signInWithPopup} from "firebase/auth";
  import React, {useState, useEffect} from "react";
  import Axios from "axios";
  // import { useNavigate } from 'react-router-dom';
  // import { userAction } from '../../store';
  // import { useDispatch, useSelector } from 'react-redux';
  // import { isEqual } from 'lodash';
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
  
  // const Authorization = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlYjMxMjdiMjRjZTg2MDJjODEyNDUxZThmZTczZDU4MjkyMDg4N2MiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVmnDqm4gTmd1eeG7hW4gVGhhbmgiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNXB6TXVocmlqVGZZakdxb19mazVTdjJCT2NReGNQSXhjWjhlMHRPUT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9yZWFjdC1hdXRoLWJjMGE0IiwiYXVkIjoicmVhY3QtYXV0aC1iYzBhNCIsImF1dGhfdGltZSI6MTY3NjcwMTE5MSwidXNlcl9pZCI6ImRVdXp2WWRZVm1YUk1EblpCNVBrOXlaRXg4MzMiLCJzdWIiOiJkVXV6dllkWVZtWFJNRG5aQjVQazl5WkV4ODMzIiwiaWF0IjoxNjc2NzAxMTkxLCJleHAiOjE2NzY3MDQ3OTEsImVtYWlsIjoidGhhbmh2aWVubmd1eWVuMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTc3NDI5NzMzMDMxMTc0OTQ0ODEiXSwiZW1haWwiOlsidGhhbmh2aWVubmd1eWVuMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.BNaTuZj_AaseocQK0qHLOw6gB1UhzTsPPV5Df1FGLoS529Ge7aizSfhLMzH7Tjq6KPXwybsttLrnImh_YKESRA0AcKz7LcuBzq14xx-_e88TwRv3Kge8IRfNwVqMRUg7IXYJNDtvZG8m4eEQvIB7kXV1Fscd8tgicG4HDXrBJb-LnhlzJfLRgVc6nYVEPgiSbFPsgcafpyzvj3U_5f6_MWf1ETLx0LSv39g1hBWRHVS4VkzjT2WN32KlrHDoQOBTW6UgMBch62YHO9wZx33eZjUCkm2KI1Zn79zXGen26RM_holM6_hIgfMbGMnk1C_2mNAuNXHW5Qk7vUR10lWSEw"
  const Login = () => {
    const [value, setValue] = useState('')
    const navigate = useNavigate();
      const signWithGoogle = async () => {
        // signInWithPopup(auth, provider).then((data) => {
        // localStorage.setItem("email", data.user.email)
        
        try {
          const token = await authService.loginWithGoogle();         
          console.log(token);
          navigate("/Dashboard"); 
        } catch (error) {
          console.error(error);
        }
  
    }
    
    useEffect(() => {
    setValue(localStorage.getItem('student'))
    
    })
    
    return (
      <>
      <ProConfigProvider hashed={false}>
      {/* {value?<Dashboard/>: */}
        <div style={{ backgroundColor: 'white' }}>
          <LoginForm
            logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            title="Drashboard"
            subTitle="Chào mừng bạn đến với trang CWE"
            
            // message='Submit'
            actions={
              <Space>
                Liên hệ
                <AlipayCircleOutlined style={iconStyles} />
                <TaobaoCircleOutlined style={iconStyles} />
                <WeiboCircleOutlined style={iconStyles} />
              </Space>
            }
            onFinish={signWithGoogle}
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
          {/* } */}
      </ProConfigProvider>
      </>
  
    );
        }

  export default Login

// import React, { useEffect } from "react";
// import CustomInput from "../components/CustomInput";
// import { Link, useNavigate } from "react-router-dom";
// import * as yup from "yup";
// import { useFormik } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../features/auth/authSlice";

// let schema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Email should be valid")
//     .required("Email is Required"),
//   password: yup.string().required("Password is Required"),
// });
// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       dispatch(login(values));
//     },
//   });
//   const authState = useSelector((state) => state);

//   const { user, isError, isSuccess, isLoading, message } = authState.auth;

//   useEffect(() => {
//     if (isSuccess) {
//       navigate("admin");
//     } else {
//       navigate("");
//     }
//   }, [user, isError, isSuccess, isLoading]);
//   return (
//     <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
//         <h3 className="text-center title">Login</h3>
//         <p className="text-center">Login to your account to continue.</p>
//         <div className="error text-center">
//           {message.message == "Rejected" ? "You are not an Admin" : ""}
//         </div>
//         <form action="" onSubmit={formik.handleSubmit}>
//           <CustomInput
//             type="text"
//             label="Email Address"
//             id="email"
//             name="email"
//             onChng={formik.handleChange("email")}
//             onBlr={formik.handleBlur("email")}
//             val={formik.values.email}
//           />
//           <div className="error mt-2">
//             {formik.touched.email && formik.errors.email}
//           </div>
//           <CustomInput
//             type="password"
//             label="Password"
//             id="pass"
//             name="password"
//             onChng={formik.handleChange("password")}
//             onBlr={formik.handleBlur("password")}
//             val={formik.values.password}
//           />
//           <div className="error mt-2">
//             {formik.touched.password && formik.errors.password}
//           </div>
//           <div className="mb-3 text-end">
//             <Link to="forgot-password" className="">
//               Forgot Password?
//             </Link>
//           </div>
//           <button
//             className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
//             style={{ background: "#ffd333" }}
//             type="submit"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;