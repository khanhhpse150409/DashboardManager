import React from "react";
import { Button, Form, Input, Select, notification, Space, Spin } from "antd";
import { useState, useEffect } from "react";
import { getStudent, editStudent } from "./fetcher";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const EditStudent = ({idStudent}) => {
  const [dataStudent, setDataStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      placement,
    });
  };

  // Fetch dataStudent from server
  useEffect(() => {
    getStudent(idStudent)
      .then((payload) => {
        setDataStudent(payload.student);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  }, [idStudent]);

  // Set initialValues from dataStudent
  const initialValues = {
    student_id: dataStudent?.student_id || "",
    name: dataStudent?.student_name || "",
    avatar: dataStudent?.avatar || "",
    email: dataStudent?.email || "",
    status: dataStudent?.status || "",
    major: dataStudent?.student_major?.major || "",
    major_id: dataStudent?.student_major?.major_id || "",
    role_id: dataStudent?.student_role?.role_id || "",
    role_name: dataStudent?.student_role?.role_name || "",
  };

  // Handle form submission
  const onFinish = (values) => {
    const dataStudent = {
      student_id: values.student_id || "",
      role_id: values.role_id || "",
      status: values.status || "",
    };

    editStudent(dataStudent)
      .then((payload) => {
        if (payload.msg === "1 student update") {
          openNotification("update successful");
        } else {
          openNotification("update failed");
        }
      })
      .catch((err) => {
        openNotification("update failed");
        console.log("err", err);
      });
  };

  // Handle form reset
  const onReset = () => {
    formRef.current?.resetFields();
  };

  // Ref for the form
  const formRef = React.useRef(null);

  if (loading) {
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </Space>
    );
  }

  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        ref={formRef}
        name="control-ref"
        onFinish={onFinish}
        initialValues={initialValues}
        style={{
          maxWidth: 600,
        }}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập họ và tên của bạn",
          },
        ]}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Id student"
          name="student_id"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item label="Major" name="major">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="role_id"
          label="Role"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="5826d1d9-c33a-45c5-b93e-894e1dde10bd">Admin</Option>
            <Option value="bd86e723-a2d5-47f5-87f2-9a4bc6fe8bb2">Users</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="active">active</Option>
            <Option value="deactive">deactive</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            style={{ margin: "10px" }}
            htmlType="button"
            onClick={onReset}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditStudent;
