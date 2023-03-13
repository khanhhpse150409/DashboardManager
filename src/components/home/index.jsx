import { ProCard } from "@ant-design/pro-components";
import { Statistic } from "antd";
import RcResizeObserver from "rc-resize-observer";
import { useState, useEffect } from "react";
import { listProject, listStudent } from "./fetcher";

const { Divider } = ProCard;

const Home = () => {
  const [responsive, setResponsive] = useState(false);
  const [dataProject, setDataProject] = useState(null);
  const [dataStudent, setDataStudent] = useState(null);


  const fetchData = () => {
    listProject()
      .then((payload) => {
        setDataProject(payload.projects.count);
      })
      .catch((err) => {
        console.log("err", err);
      });

    listStudent()
      .then((payload) => {
        setDataStudent(payload.student.count);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard.Group title="Total" direction={responsive ? "column" : "row"}>
        <ProCard>
          <Statistic title="Users" value={dataStudent} />
        </ProCard>
        <Divider type={responsive ? "horizontal" : "vertical"} />
        <ProCard>
          <Statistic title="Projects" value={dataProject} />
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
