import React from "react";
import { Tabs, notification, Empty } from "antd";
import { Link } from "dva/router";
import TableComponent from "./components/table";
import request from "../../../../utils/request";
import cache from "../../../../utils/cache";

const { TabPane } = Tabs;

export default class Order extends React.Component {
  state = {
    orders: []
  };

  async componentDidMount() {
    this.getOrders()
  }

  getOrders = async () => {
    const user = cache.getUser();
    const res = await request("/getHistoryOrders", {
      body: { userId: user.id }
    });
    const { code, extend } = res;
    if (code === 500) {
      notification.error({
        message: "提示",
        description: "网络出错了"
      });
      return;
    }
    const { historyOrders = {} } = extend;
    this.setState({ orders: historyOrders });
  }

  renderEmpty = (type = "") => {
    return (
      <div className="emptyCart">
        <Empty description={false} />
        <div className="label">您还没有{type}订单哦~</div>
        <div className="link">
          <Link to="/allproducts">
            去购物
            <span style={{ color: "#979797" }}>{"  >"}</span>
          </Link>
        </div>
      </div>
    );
  };

  render() {
    const { orders } = this.state;
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="全部订单" key="1">
          {orders.length ? (
            <TableComponent orders={orders} reflesh={this.getOrders} />
          ) : (
            this.renderEmpty()
          )}
        </TabPane>
        <TabPane tab="待付款" key="2">
          {/* {orders.length ? (
            <TableComponent orders={orders} />
          ) : (
            this.renderEmpty('待付款')
          )} */}
          {this.renderEmpty("待付款")}
        </TabPane>
        <TabPane tab="待收货" key="3">
          {/* {orders.length ? (
            <TableComponent orders={orders} />
          ) : (
            this.renderEmpty('待收货')
          )} */}
          {this.renderEmpty("待收货")}
        </TabPane>
        <TabPane tab="待评价" key="4">
          {/* {orders.length ? (
            <TableComponent orders={orders} />
          ) : (
            this.renderEmpty()
          )} */}
          {this.renderEmpty("待评价")}
        </TabPane>
      </Tabs>
    );
  }
}
