import { Tag, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { listProject, deleteProject } from "./fetcher";
import ListStudent from "./listStudent";
import { useState, useEffect } from "react";

const STATUS_COLORS = {
  Active: "#31AFFE",
  Deactive: "#616887",
  Received: "#10ff00",
};
const ManagerProject = () => {
  const [listDataStudent, setListDataStudent] = useState(null);
  const [countDelete, setCountDelete] = useState(1);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      placement,
    });
  };

  const createColumns = [
    {
      title: "Name project",
      dataIndex: "project_name",
    },
    {
      title: "Owner",
      dataIndex: "project_poster",
      render: (value) => <div>{value.student_name}</div>,
    },
    {
      title: "Price",
      dataIndex: "price",
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
      title: "Url",
      dataIndex: "url",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      dataIndex: "project_id",
      fixed: "right",
      width: 100,
      render: (value) => (
        <div>
          <DeleteOutlined
            style={{ color: "red", marginLeft: "20px" }}
            onClick={handleDelete(value)}
          />
        </div>
      ),
    },
  ];

  const handleDelete = (value) => () => {
    deleteProject(value)
      .then((payload) => {
        if (payload.msg === "1 projects is deleted") {
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
    listProject()
      .then((payload) => {
        setListDataStudent(payload.projects.rows);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchListDataStudent();
  }, [ countDelete]);

  return (
    <>
      {contextHolder}
      <h6>List student</h6>
      <ListStudent
        createColumns={createColumns}
        listDataStudent={listDataStudent}
      />
    </>
  );
};
export default ManagerProject;
