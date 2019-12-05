import React from "react";
import { Link } from "dva/router";
import styles from "./index.scss";

import logo from "./image/logo.png";
import cart from "./image/cart.png";
import search from "./image/search.png";

export default class Navigator extends React.Component {
  state = {
    showCategory: false
  };

  handleShowCategory = (isEnter = false) => {
    const { validMouse = true } = this.props;
    if (!validMouse) {
      return;
    }
    this.setState({ showCategory: isEnter });
  };

  getCurrentPath = () => window.location.pathname;

  render() {
    
    return (
      <div className="navigation">
        <div className="wrap">
          <Link to="/" className="logo">
            <img src={logo} alt="logo" className="logoi" />
          </Link>
          <ul className="ul-bar-left">
            <li>
              <a
                href="#"
                className="word chakan"
                onMouseEnter={() => this.handleShowCategory(true)}
                onMouseLeave={() => this.handleShowCategory(false)}
              >
                查看所有类别
              </a>
            </li>
            <li>
              <Link to='/' className="word">
                首页
              </Link>
            </li>
            <li>
              <a href="/allproducts" className="word">
                所有产品
              </a>
            </li>
            <li>
              <a href="#" className="word">
                博客
              </a>
            </li>
            <li>
              <a href="#" className="word">
                文章列表
              </a>
            </li>
          </ul>
          <ul className="ul-bar-right">
            <li className="word a0">0</li>
            <li className="img2">
              <Link to='/cart'>
                <img src={cart} alt="购物车" />
              </Link>
            </li>
            <li>
              <Link
                className="word zhuc"
                to={{
                  pathname: "/login",
                  state: { isLogin: false }
                }}
              >
                注册
              </Link>
            </li>
            <li
              className="word ash"
              style={{
                display: this.getCurrentPath() === "/login" ? "none" : "block"
              }}
            >
              |
            </li>
            <li
              style={{
                display: this.getCurrentPath() === "/login" ? "none" : "block"
              }}
            >
              <Link
                className="word dengl"
                to={{
                  pathname: "/login",
                  state: { isLogin: true }
                }}
              >
                登录
              </Link>
            </li>
            <li className="img3">
              <a href="#">
                <img src={search} alt="搜索" />
              </a>
            </li>
          </ul>
        </div>
        <div
          className="wrap2"
          style={{ display: this.state.showCategory ? "block" : "none" }}
          onMouseEnter={() => this.handleShowCategory(true)}
          onMouseLeave={() => this.handleShowCategory(false)}
        >
          <ul>
            <li>
              <a href="">不锈钢</a>
            </li>
            <li>
              <a href="">原料水泥</a>
            </li>
            <li>
              <a href="">塑料</a>
            </li>
            <li>
              <a href="">木制</a>
            </li>
            <li>
              <a href="">陶瓷</a>
            </li>
          </ul>
          <div className="wA1">
            <a href="#" className="w2I">
              <img src={require("./image/img101.png")} alt="" />
            </a>
            <a href="#" className="w2P1">
              <p>简约原木餐盘</p>
            </a>
            <p className="w2P2">￥300.00</p>
          </div>
          <div className="wA2">
            <a href="#" className="w2I">
              <img src={require("./image/img102.png")} alt="" />
            </a>
            <a href="#" className="w2P1">
              <p>不锈钢时尚咖啡水壶</p>
            </a>
            <p className="w2P2">￥400.00</p>
          </div>
          <div className="wA3">
            <a href="#" className="w2I">
              <img src={require("./image/img103.png")} alt="" />
            </a>
            <a href="#" className="w2P1">
              <p>经典系列红色时钟</p>
            </a>
            <p className="w2P2">￥580.00</p>
          </div>
        </div>
      </div>
    );
  }
}
