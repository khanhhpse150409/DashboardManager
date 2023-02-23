import { Row, Col, Table, Tag, ConfigProvider, Space } from "antd";
import { listStudent, listStudentTest } from "./fetcher";
import { useState, useEffect } from "react";
import { format as formatFns } from "date-fns";

const STATUS_COLORS = {
  active: "#31AFFE",
  deactive: "#616887",
};

const compare = (a, b, key) => {
  if (a[key] === b[key]) return 0;
  if (a[key] === undefined) return -1;
  if (b[key] === undefined) return 1;
  return Number(a[key]) - Number(b[key]);
};

const invalidValue = (value) => [null, undefined, ""].includes(value);

const formatDateTime = (value) => formatFns(value, "hh:mm dd/MM/yyyy");

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
];

const ListStudent = () => {
  const [listDataStudent, setListDataStudent] = useState(null);

  const fetchListDataStudent = () => {
    listStudent()
      .then((payload) => {
        console.log("payload", payload);
        setListDataStudent(payload.students.rows);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    fetchListDataStudent();
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <ConfigProvider>
          <Table
            rowKey="id"
            columns={createColumns}
            dataSource={listDataStudent}
            scroll={{ x: "max-content" }}
          />
        </ConfigProvider>
      </Col>
    </Row>
  );
};
export default ListStudent;
