import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from "@ant-design/icons";

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
            name: "List Students",
            icon: "https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg",
            component: "./Welcome",
          },
          {
            path: "/userList",
            name: "Student Management",
            icon: <TabletFilled />,
            component: "./Welcome",
          },
          {
            path: "/admin/sub-page2",
            name: "Second page",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
          {
            path: "/admin/sub-page3",
            name: "Third page",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
        ],
      },
      {
        name: "List",
        icon: <TabletFilled />,
        path: "/list",
        component: "./ListTableList",
        routes: [
          {
            path: "/list/sub-page",
            name: "List page",
            icon: <CrownFilled />,
            routes: [
              {
                path: "sub-sub-page1",
                name: "Fist list page",
                icon: <CrownFilled />,
                component: "./Welcome",
              },
              {
                path: "sub-sub-page2",
                name: "Second list page",
                icon: <CrownFilled />,
                component: "./Welcome",
              },
              {
                path: "sub-sub-page3",
                name: "Third list page",
                icon: <CrownFilled />,
                component: "./Welcome",
              },
            ],
          },
          {
            path: "/list/sub-page2",
            name: "Secondary list page",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
          {
            path: "/list/sub-page3",
            name: "Third list page",
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
