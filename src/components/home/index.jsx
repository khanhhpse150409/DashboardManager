import { ProCard } from "@ant-design/pro-components";
import { Statistic } from "antd";
import RcResizeObserver from "rc-resize-observer";
import { useState } from "react";

const { Divider } = ProCard;

const Home = () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard.Group title="Total" direction={responsive ? "column" : "row"}>
        <ProCard>
          <Statistic title="Users" value={79} />
        </ProCard>
        <Divider type={responsive ? "horizontal" : "vertical"} />
        <ProCard>
          <Statistic title="Unmerged" value={93} suffix="/ 100" />
        </ProCard>
        <Divider type={responsive ? "horizontal" : "vertical"} />
        <ProCard>
          <Statistic title="Earnings" value={`$112893.00`} />
        </ProCard>
        <Divider type={responsive ? "horizontal" : "vertical"} />
        <ProCard>
          <Statistic title="My balance" value={`$112893.00`} />
        </ProCard>
      </ProCard.Group>
    </RcResizeObserver>
  );
};
export default Home;
