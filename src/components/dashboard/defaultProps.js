import { CrownFilled, SmileFilled } from "@ant-design/icons";

const defaultProps = {
  route: {
    path: "/",
    routes: [
      {
        path: "/home",
        name: "Welcome",
        icon: <SmileFilled />,
        component: "./Welcome",
      },
      {
        path: "/home",
        name: "Management page",
        icon: <CrownFilled />,
        access: "canAdmin",
        component: "./Admin",
        routes: [
          {
            path: "/admin/student",
            name: "Student Management",
            icon: "https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg",
            component: "./Welcome",
          },
          {
            path: "/admin/project",
            name: "Project Management",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
          {
            path: "/admin/category",
            name: "Category Management",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
          {
            path: "/admin/major",
            name: "Major Management",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
        ],
      },
    ],
  },
  location: {
    pathname: "/",
  },
};

export default defaultProps;
