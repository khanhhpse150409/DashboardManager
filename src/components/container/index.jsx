import ListStudent from "../student/listStudent";
import Page404 from "../page404";
import Home from "../home";
import { useState, useEffect } from "react";

const Container = ({ pathname }) => {
  const [component, setComponent] = useState(null);
  const setPathName = () => {
    switch (pathname) {
      case "/welcome":
        setComponent(<Home />);
        break;
      case "/home":
        setComponent(<Home />);
        break;
      case "/admin/student":
        setComponent(<ListStudent />);
        break;
      default:
        setComponent(<Page404 />);
        break;
    }
  };
  useEffect(() => {
    setPathName();
  }, [pathname]);
  return component;
};
export default Container;
