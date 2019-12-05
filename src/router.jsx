import React from "react";
import { Route, Switch, routerRedux } from "dva/router";
import dynamic from "dva/dynamic";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";

const { ConnectedRouter } = routerRedux;
const dynamicWrapper = app => component =>
  dynamic({
    app,
    component
  });

export default function({ history, app }) {
  const hasAppDynamicWrapper = dynamicWrapper(app);

  const routes = [
    {
      path: "/",
      key: "home",
      component: hasAppDynamicWrapper(() => import("./routes/home"))
    },
    {
      path: "/login",
      key: "login",
      component: hasAppDynamicWrapper(() => import("./routes/login"))
    },
    {
      path: "/prodetail/:id",
      key: "prodetail",
      component: hasAppDynamicWrapper(() => import("./routes/productDetail"))
    },
    {
      path: "/cart",
      key: "cart",
      component: hasAppDynamicWrapper(() => import("./routes/cart"))
    },
    {
      path: "/allproducts",
      key: "allproducts",
      component: hasAppDynamicWrapper(() => import("./routes/allproducts"))
    },
    {
      path: "/user",
      key: "user",
      component: hasAppDynamicWrapper(() => import("./routes/user"))
    }
  ];

  return (
    <ConfigProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map(({ path, key, component }) => (
            <Route key={key} exact path={path} component={component} />
          ))}
        </Switch>
      </ConnectedRouter>
    </ConfigProvider>
  );
}
