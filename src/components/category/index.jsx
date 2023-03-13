import { Tag, notification, Button, Modal, Form, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { listCategory, deleteStudent, createCategory } from "./fetcher";
import EditStudent from "./editStudent";
import ListStudent from "./listStudent";
import React, { useState, useEffect } from "react";

const STATUS_COLORS = {
  Active: "#31AFFE",
  Deactive: "#616887",
};

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

const ManagerCategory = () => {
  const [listDataStudent, setListDataStudent] = useState(null);
  const [openEditStudent, setOpenEditStudent] = useState(false);
  const [countDelete, setCountDelete] = useState(1);
  const [idStudent, setIdStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      placement,
    });
  };

  const createColumns = [
    {
      title: "Name",
      dataIndex: "cate_name",
    },
    {
      title: "Id",
      dataIndex: "cate_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (value) => (
        <Tag
          color={STATUS_COLORS[value]}
          style={{ borderRadius: "12px", margin: 0 }}
        >
          {value}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "cate_id",
      fixed: "right",
      width: 100,
      render: (value) => (
        <div>
          <EditOutlined onClick={openEdit(value)} />
          <DeleteOutlined
            style={{ color: "red", marginLeft: "20px" }}
            onClick={handleDelete(value)}
          />
        </div>
      ),
    },
  ];

  const backPage = () => () => {
    setOpenEditStudent(false);
  };

  const openEdit = (value) => () => {
    setIdStudent(value);
    setOpenEditStudent(true);
  };

  const handleDelete = (value) => () => {
    deleteStudent(value)
      .then((payload) => {
        console.log(payload);
        if (payload.msg === "1 categories is deleted") {
          openNotification("delete successful");
          fetchListDataStudent();
          setCountDelete(countDelete + 1);
        } else {
          openNotification("delete failed");
        }
      })
      .catch((err) => {
        openNotification("delete failed");
        console.log("err", err);
      });
  };

  const fetchListDataStudent = () => {
    listCategory()
      .then((payload) => {
        setListDataStudent(payload.categories.rows);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchListDataStudent();
  }, [openEditStudent, countDelete]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const formRef = React.useRef(null);

  const onFinish = (data) => {
    createCategory(data)
      .then((payload) => {
        if (payload.msg === "Create new category successfully") {
          openNotification("Create new category successfully");
          fetchListDataStudent();
          setIsModalOpen(false);
        } else {
          openNotification("Create new category failed");
        }
      })
      .catch((err) => {
        openNotification("Create new category failed");
        console.log("err", err);
      });
  };

  return (
    <>
      {contextHolder}
      {openEditStudent ? (
        <>
          <ArrowLeftOutlined onClick={backPage()} />
          <h6
            style={{
              display: "inline-block",
              margin: "20px",
            }}
          >
            Edit category
          </h6>
          <Button type="primary" onClick={showModal}>
            <PlusOutlined /> Add category
          </Button>
        </>
      ) : (
        <>
          <h6 style={{ display: "inline-block", margin: "20px" }}>
            List category
          </h6>
          <Button type="primary" onClick={showModal}>
            <PlusOutlined /> Add category
          </Button>
        </>
      )}
      {openEditStudent ? (
        <EditStudent idStudent={idStudent} />
      ) : (
        <ListStudent
          createColumns={createColumns}
          listDataStudent={listDataStudent}
        />
      )}
      <Modal
        title="Create Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Cancel
          </Button>,
        ]}
      >
        <Form
          {...layout}
          ref={formRef}
          name="control-ref"
          onFinish={onFinish}
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
            label="Cate name"
            name="cate_name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ManagerCategory;
