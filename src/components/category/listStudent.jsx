import { Row, Col, Table, ConfigProvider } from "antd";

const ListStudent = ({ createColumns, listDataStudent }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <ConfigProvider>
          <Table
            rowKey="id"
            columns={createColumns}
            dataSource={listDataStudent}
            scroll={{ x: "max-content" }}
            pagination={{
              pageSize: 5,
            }}
          />
        </ConfigProvider>
      </Col>
    </Row>
  );
};
export default ListStudent;
