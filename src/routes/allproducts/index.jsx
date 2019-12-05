import React from "react";
import { Breadcrumb, Icon, Switch, Pagination, BackTop } from "antd";
import { Link } from "dva/router";
import Footer from "../../components/footer";
import styles from "./index.scss";
import logo from "../../assets/images/logo.png";

export default class Allproducts extends React.Component {
  state = {
    shopList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  };
  render() {
    const { shopList } = this.state;
    console.log(styles)
    return (
      <div className="container">
      {/* <div className={styles.container}>  */}
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
              <a className="cart" href='/cart'>
                <div>
                  <Icon type="shopping-cart" style={{ marginRight: 3, fontSize: 15 }} />
                  购物车
                </div>
                <span>0</span>
              </a>
            </div>
          </div>
        </header>
        <div className='container-wrap'>
          <BackTop />
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/" style={{ color: "black" }}>
                首页
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>所有商品</Breadcrumb.Item>
          </Breadcrumb>
          <div className="screen">
            <table>
              <tr className="t1">
                <th>品牌</th>
                <td>
                  <a href="#">无印</a>
                  <a href="#">博朗</a>
                  <a href="#">花印</a>
                </td>
              </tr>
              <tr className="t2">
                <th>类别</th>
                <td>
                  <a href="#">不锈钢</a>
                  <a href="#">原料水泥</a>
                  <a href="#">塑料</a>
                  <a href="#">木质</a>
                </td>
              </tr>
            </table>
          </div>
          <div className="search-bar">
            <div className="left">
              <span style={{ marginRight: 20 }}>
                综合 <Icon type="caret-down" />
              </span>
              <span style={{ marginRight: 20 }}>
                销量 <Icon type="caret-down" />
              </span>
              <span>
                价格 <Icon type="caret-down" />
              </span>
            </div>
            <div className="right">
              仅显示有货 <Switch />
              <span style={{ marginLeft: 20 }}>
                共<span style={{ color: "red" }}>&nbsp;20&nbsp;</span>个商品
              </span>
            </div>
          </div>
          <div className="shops">
            <ul>
              {shopList.map((shop, index) => {
                return (
                  <li key={`${index}${Math.random()}`}>
                    <a href={`/proDetail/${index + 1}`}>
                      <img src={require("../home/images/img21.png")} />
                    </a>
                    <p
                      className="p1"
                      onClick={() => {
                        window.location.href = `/proDetail/${index + 1}`;
                      }}
                    >
                      春夏秋冬
                    </p>
                    <p className="p2">
                      ￥<span>22.5</span>
                    </p>
                    <p className="p3">小爱小家专营店</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="pagination">
            <Pagination
              total={50}
              showSizeChanger
              showQuickJumper
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
