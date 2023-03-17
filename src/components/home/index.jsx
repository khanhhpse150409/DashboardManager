import { ProCard } from "@ant-design/pro-components";
import { Statistic, Card, Row, Col, Space, Spin } from "antd";
import RcResizeObserver from "rc-resize-observer";
import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/plots";
import DemoPie from "./chartCircle";

import {
  getDataProjects,
  getDataFinishProjects,
  getDataAccounts,
  getDataTransaction,
} from "./fetcher";

const { Divider } = ProCard;

const Home = () => {
  const [responsive, setResponsive] = useState(false);
  const [dataProject, setDataProject] = useState(null);
  const [dataProjectFinish, setDataProjectFinish] = useState(null);
  const [dataAccounts, setDataAccounts] = useState(null);
  const [dataTransaction, setDataTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    getDataProjects()
      .then((payload) => {
        setDataProject(payload);
      })
      .catch((err) => {
        console.log("err", err);
      });

    getDataFinishProjects()
      .then((payload) => {
        setDataProjectFinish(payload);
      })
      .catch((err) => {
        console.log("err", err);
      });

    getDataAccounts()
      .then((payload) => {
        setDataAccounts(payload);
      })
      .catch((err) => {
        console.log("err", err);
      });

    getDataTransaction()
      .then((payload) => {
        setDataTransaction(payload);
      })
      .catch((err) => {
        console.log("err", err);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = [
    {
      name: "Project",
      type: "All",
      value: dataProject?.all || 0,
    },
    {
      name: "Project",
      type: "Week",
      value: dataProject?.in_1_week || 0,
    },
    {
      name: "Project",
      type: "Month",
      value: dataProject?.in_1_month || 0,
    },
    {
      name: "Project",
      type: "6 month",
      value: dataProject?.in_6_month || 0,
    },
    {
      name: "Project",
      type: "Year",
      value: dataProject?.in_1_year || 0,
    },
    {
      name: "Project Finish",
      type: "All",
      value: dataProjectFinish?.all || 0,
    },
    {
      name: "Project Finish",
      type: "Week",
      value: dataProjectFinish?.in_1_week || 0,
    },
    {
      name: "Project Finish",
      type: "Month",
      value: dataProjectFinish?.in_1_month || 0,
    },
    {
      name: "Project Finish",
      type: "6 month",
      value: dataProjectFinish?.in_6_month || 0,
    },
    {
      name: "Project Finish",
      type: "Year",
      value: dataProjectFinish?.in_1_year || 0,
    },
  ];

  const config = {
    data,
    isGroup: true,
    xField: "type",
    yField: "value",
    seriesField: "name",

    label: {
      position: "middle",
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };

  if (loading) {
    return (
      <Space direction="vertical" style={{ width: "100%", marginTop: "100px" }}>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </Space>
    );
  }

  return (
    <>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard.Group
          title="Total"
          direction={responsive ? "column" : "row"}
          style={{ marginBottom: "20px" }}
        >
          <ProCard>
            <Statistic title="Active Users" value={dataAccounts?.all} />
          </ProCard>
          <Divider type={responsive ? "horizontal" : "vertical"} />
          <ProCard>
            <Statistic title="Projects" value={dataProject?.all} />
          </ProCard>
          <Divider type={responsive ? "horizontal" : "vertical"} />
          <ProCard>
            <Statistic title="Projects finish" value={dataProjectFinish?.all} />
          </ProCard>
          <Divider type={responsive ? "horizontal" : "vertical"} />
          <ProCard>
            <Statistic title="Transaction" value={`$${dataTransaction?.all}`} />
          </ProCard>
        </ProCard.Group>
      </RcResizeObserver>

      <Row gutter={16}>
        <Col span={14}>
          <Card title="Chart project">
            <Column {...config} />
          </Card>
        </Col>
        <Col span={10}>
          <Card title="Chart project circle">
            <DemoPie
              dataProject={dataProject}
              dataProjectFinish={dataProjectFinish}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Home;
