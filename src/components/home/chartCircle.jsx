import React from "react";
import { Pie } from "@ant-design/plots";
import { Space, Spin } from "antd";

const DemoPie = (dataChart) => {
  console.log("dataProjectFinish", dataChart);
  const data = [
    {
      type: "Finished Project",
      value: dataChart.dataProjectFinish?.all || 1,
    },
    {
      type: "Unfinished Project",
      value: dataChart.dataProject?.all -  dataChart.dataProjectFinish?.all || 1,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };

  if (!dataChart.dataProject && !dataChart.dataProjectFinish) {
    return (
      <Space direction="vertical" style={{ width: "100%", marginTop: "100px" }}>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </Space>
    );
  }
  return <Pie {...config} />;
};

export default DemoPie;
