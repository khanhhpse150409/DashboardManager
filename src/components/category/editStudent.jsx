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

const EditStudent = ({ idStudent }) => {
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
        setDataStudent(payload.cate);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  }, [idStudent]);

  // Set initialValues from dataStudent
  const initialValues = {
    cate_id: dataStudent?.cate_id || "",
    cate_name: dataStudent?.cate_name || "",
    status: dataStudent?.status || "",
  };

  // Handle form submission
  const onFinish = (values) => {

    editStudent(values)
      .then((payload) => {
        console.log(payload);
        if (payload.msg === "1 category is updated") {
          openNotification("1 category is updated");
        } else {
          openNotification("1 category is updated failed");
        }
      })
      .catch((err) => {
        openNotification("1 category is updated failed");
        console.log("err", err);
      });
  };

  // Ref for the form
  const formRef = React.useRef(null);

  if (loading) {
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
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
          label="Category Id"
          name="cate_id"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Category Name"
          name="cate_name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
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
            <Option value="Active">Active</Option>
            <Option value="Deactive">DeActive</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditStudent;
