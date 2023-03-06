import { Tag, Space, notification } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { listStudent, deleteStudent } from "./fetcher";
import EditStudent from "../student/editStudent";
import ListStudent from "./listStudent";
import { useState, useEffect } from "react";

const STATUS_COLORS = {
  active: "#31AFFE",
  deactive: "#616887",
};
const ManagerStudent = () => {
  const [listDataStudent, setListDataStudent] = useState(null);
  const [openEditStudent, setOpenEditStudent] = useState(false);
  const [countDelete, setCountDelete] = useState(1);
  const [idStudent, setIdStudent] = useState(null);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      placement,
    });
  };

  const createColumns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (value) => (
        <Space>
          <div>
            <img
              style={{ position: "relative", zIndex: 1, borderRadius: "50%" }}
              width={24}
              height={24}
              src={value}
              alt="avatar"
            />
          </div>
        </Space>
      ),
    },
    {
      title: "Name",
      dataIndex: "student_name",
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "student_role",
      render: (value) => <div>{value.role_name}</div>,
    },
    {
      title: "Action",
      dataIndex: "student_id",
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
        if (payload.msg === "1 student delete") {
          openNotification("delete successful");
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
    listStudent()
      .then((payload) => {
        setListDataStudent(payload.students.rows);
        console.log(payload.students.rows);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchListDataStudent();
  }, [openEditStudent, countDelete]);

  return (
    <>
      {contextHolder}

      {openEditStudent ? (
        <>
          <ArrowLeftOutlined onClick={backPage()} />
          <h6 style={{ display: "inline-block", marginLeft: "20px" }}>
            Edit student
          </h6>
        </>
      ) : (
        <h6>List student</h6>
      )}

      {openEditStudent ? (
        <EditStudent idStudent={idStudent} />
      ) : (
        <ListStudent
          createColumns={createColumns}
          listDataStudent={listDataStudent}
        />
      )}
    </>
  );
};
export default ManagerStudent;
