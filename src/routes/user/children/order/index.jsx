import React from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;

export default class Order extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="全部订单" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="待付款" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="待收货" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="待评价" key="4">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    );
  }
}
