import React from "react";
import { Layout, Icon } from "antd";
import { Route, Switch } from "dva/router";
import Footer from "../../components/footer";
import SiderBar from "../../components/sider-bar";
import Order from './children/order/index.jsx'
import "./index.scss";
import logo from "../../assets/images/logo.png";
const { Sider, Content } = Layout;

export default class User extends React.Component {
  render() {
    return (
      <Layout className="user-wrap">
        <header>
          <div>
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
            <div>
              <div className="searchBox">
                <input placeholder="请输入商品名称" />
                <div>
                  <Icon
                    type="search"
                    style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}
                  />
                </div>
              </div>
              <a className="cart" href="/cart">
                <div>
                  <Icon
                    type="shopping-cart"
                    style={{ marginRight: 3, fontSize: 15 }}
                  />
                  购物车
                </div>
                <span>2</span>
              </a>
            </div>
          </div>
        </header>
        <Layout className="layout-container">
          <Sider width="180" className="sider" style={{ background: "#fff" }}>
            <SiderBar />
          </Sider>
          <Content className="content">
            <Switch>
              <Route path="/user" component={Order} />
            </Switch>
          </Content>
        </Layout>
        <Footer />
      </Layout>
    );
  }
}
