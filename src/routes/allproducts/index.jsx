import React from "react";
import { Breadcrumb, Icon, Switch, Pagination, BackTop } from "antd";
import { Link } from "dva/router";
import Footer from "../../components/footer";
import styles from "./index.scss";
import logo from "../../assets/images/logo.png";
import request from "../../utils/request";

export default class Allproducts extends React.Component {
  state = {
    shopList: [],
    categorys: [{ category: "全部", id: 0 }],
    curIndex: 0, // 当前分类下标
    pageNo: 1,
    pageSize: 10,
    total: 0,
    sortPrice: false,
    sortSold: false
  };
  async componentDidMount() {
    const res = await request("/goodsCate");
    const {
      extend: { goodCate: categorys }
    } = res;
    this.fetchShops({ pageNo: 1, pageSize: 10 });
    this.setState(preState => ({
      categorys: preState.categorys.concat(categorys)
    }));
  }

  // 价格排序
  sortByPrice = type => {
    let { shopList, sortPrice } = this.state;
    shopList.sort((s1, s2) => {
      return type ? s1.price - s2.price : s2.price - s1.price;
    });
    sortPrice = !sortPrice;
    this.setState({ shopList, sortPrice });
  };

  // 销售量排序
  sortBySold = type => {
    let { shopList, sortSold } = this.state;
    shopList.sort((s1, s2) => {
      return type ? s1.sold - s2.sold : s2.sold - s1.sold;
    });
    sortSold = !sortSold;
    this.setState({ shopList, sortSold });
  };

  fetchShops = async (data = {}) => {
    const {
      extend: {
        page: { list: shopList, total }
      }
    } = await request("/allGoods", { body: data });
    this.setState({ shopList, total });
  };

  onChange = (pageNo, pageSize) => {
    const { curIndex } = this.state;
    this.setState({ pageNo, pageSize }, () => {
      this.fetchShops({ pageNo, pageSize, cateId: curIndex });
    });
  };

  onShowSizeChange = (current, pageSize) => {
    const { curIndex } = this.state;
    this.setState({ pageSize }, () => {
      this.fetchShops({ pageNo: 1, pageSize, cateId: curIndex });
    });
  };

  handleChangeCate = id => {
    const { pageNo, pageSize } = this.state;
    this.setState({ curIndex: id }, () => {
      this.fetchShops({ pageNo, pageSize, cateId: id });
    });
  };

  render() {
    const {
      shopList,
      categorys,
      curIndex,
      total,
      sortPrice,
      sortSold
    } = this.state;
    return (
      <div className="container_all">
        <header>
          <div>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <div>
              <div className="searchBox_all">
                <input placeholder="请输入商品名称" />
                <div>
                  <Icon
                    type="search"
                    style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}
                  />
                </div>
              </div>
              <Link className="cart_all" to="/cart">
                <div>
                  <Icon
                    type="shopping-cart"
                    style={{ marginRight: 3, fontSize: 15 }}
                  />
                  购物车
                </div>
                <span>2</span>
              </Link>
            </div>
          </div>
        </header>
        <div className="container-wrap_all">
          <BackTop />
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/" style={{ color: "black" }}>
                首页
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>所有商品</Breadcrumb.Item>
          </Breadcrumb>
          <div className="screen_all">
            <table>
              <tr className="t1_all">
                <th>品牌</th>
                <td>
                  <span>无印</span>
                  <span>博朗</span>
                  <span>花印</span>
                </td>
              </tr>
              <tr className="t2_all">
                <th>类别</th>
                <td>
                  {categorys.map((ret, i) => {
                    return (
                      <span
                        key={i}
                        onClick={() => {
                          this.handleChangeCate(i);
                        }}
                        style={{
                          color: i === curIndex ? "#0d62a3" : "#555",
                          fontWeight: i === curIndex ? "bold" : ""
                        }}
                      >
                        {ret.category}
                      </span>
                    );
                  })}
                </td>
              </tr>
            </table>
          </div>
          <div className="search-bar_all">
            <div className="left_all">
              {/* <span style={{ marginRight: 20 }}>
                综合 <Icon type="caret-down" />
              </span> */}
              <span
                style={{ marginRight: 20, cursor: "pointer" }}
                onClick={() => {
                  this.sortBySold(sortSold);
                }}
              >
                销量{" "}
                <Icon
                  type="caret-down"
                  className={sortSold ? "myanimation2" : "myanimation1"}
                />
              </span>
              <span
                onClick={() => {
                  this.sortByPrice(sortPrice);
                }}
                style={{ cursor: "pointer" }}
              >
                价格{" "}
                <Icon
                  type="caret-down"
                  className={sortPrice ? "myanimation2" : "myanimation1"}
                />
              </span>
            </div>
            <div className="right_all">
              仅显示有货 <Switch />
              <span style={{ marginLeft: 20 }}>
                共<span style={{ color: "red" }}>&nbsp;20&nbsp;</span>个商品
              </span>
            </div>
          </div>
          <div className="shops_all">
            <ul>
              {shopList.map((ret, i) => {
                return (
                  <li key={i}>
                    <Link to={`/proDetail/${ret.id}`}>
                      <img src={ret.mainPic} alt="" />
                    </Link>
                    <p
                      className="p1_all"
                      onClick={() => {
                        this.props.history.push(`/proDetail/${ret.id}`);
                      }}
                    >
                      {ret.goods}
                    </p>
                    <p className="p2_all">
                      <span className="price">￥{ret.price}</span>
                      <span className="sold">已售：{ret.sold}</span>
                    </p>
                    <p className="p3_all">{ret.introduce}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="pagination_all">
            <Pagination
              total={total}
              showSizeChanger
              showQuickJumper
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onChange}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
