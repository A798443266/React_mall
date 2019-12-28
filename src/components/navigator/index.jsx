import React from "react";
import { Link } from "dva/router";
import { Menu, Badge, Icon } from "antd";
import "./index.scss";
import logo from "./image/logo.png";
import cart from "./image/cart.png";
import cache from "../../utils/cache";
import { withRouter } from "dva/router";
import request from "../../utils/request";

const { SubMenu } = Menu;

class Navigator extends React.Component {
  state = {
    showCategory: false,
    user: {},
    cates: [], // 分类名称
    curCate: [], //当前中分类商品
    curIndex: 0
  };

  async componentDidMount() {
    const user = cache.getUser();
    const res = await request("/goodsCate");
    let curCate = [];
    const {
      extend: { goodCate: cates }
    } = res;
    if (cates.length) {
      const {
        extend: {
          page: { list }
        }
      } = await request("/allGoods", {
        body: {
          cateId: cates[0].id
        }
      });
      curCate = list;
    }
    this.setState({ user, cates, curCate });
  }

  handleShowCategory = (isEnter = false) => {
    const { validMouse = true } = this.props;
    if (!validMouse) {
      return;
    }
    this.setState({ showCategory: isEnter });
  };

  logout = () => {
    cache.clearUser();
    this.props.history.push("/login");
  };

  handleEnterCategory = async (id, curIndex) => {
    const {
      extend: {
        page: { list: curCate }
      }
    } = await request("/allGoods", {
      body: {
        cateId: id
      }
    });
    this.setState({ curCate, curIndex });
  };

  getCurrentPath = () => window.location.pathname;

  render() {
    const { user, cates, curCate, curIndex } = this.state;
    const { name } = user;
    return (
      <div className="navigation">
        <div className="wrap">
          <Link to="/" className="logo">
            <img src={logo} alt="logo" className="logoi" />
          </Link>
          <ul className="left">
            <li
              onMouseEnter={() => this.handleShowCategory(true)}
              onMouseLeave={() => this.handleShowCategory(false)}
            >
              <Link to="#" className="word chakan">
                查看所有类别
              </Link>
            </li>
            <li>
              <Link to="/" className="word">
                首页
              </Link>
            </li>
            <li>
              <Link to="/allproducts" className="word">
                所有产品
              </Link>
            </li>
            <li>
              <Link to="#" className="word">
                博客
              </Link>
            </li>
            <li>
              <Link to="#" className="word">
                文章列表
              </Link>
            </li>
          </ul>
          <div
            className="logo-wrap"
            style={{
              visibility:
                this.getCurrentPath() === "/login" ? "hidden" : "visible"
            }}
          >
            <Menu mode="horizontal">
              <SubMenu
                title={<span>{name ? `欢迎您：${name}` : "登录 | 注册"}</span>}
                onTitleClick={() => {
                  if (!name) {
                    this.props.history.push("/login");
                  }
                }}
              >
                {name ? (
                  <Menu.Item
                    key="1"
                    onClick={() => this.props.history.push("/user")}
                  >
                    <Icon type="user" />
                    个人中心
                  </Menu.Item>
                ) : null}
                {name ? (
                  <Menu.Item key="2" onClick={this.logout}>
                    <Icon type="logout" />
                    退出登录
                  </Menu.Item>
                ) : null}
              </SubMenu>
            </Menu>
          </div>
          <div className="cart">
            <div className="img2">
              <Link to="/cart">
                <Badge count={3}>
                  <img src={cart} alt="购物车" />
                </Badge>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="wrap2"
          style={{ display: this.state.showCategory ? "block" : "none" }}
          onMouseEnter={() => this.handleShowCategory(true)}
          onMouseLeave={() => this.handleShowCategory(false)}
        >
          <ul>
            {cates.map((ret, i) => {
              const { id } = ret;
              return (
                <li
                  key={i}
                  onMouseEnter={() => {
                    this.handleEnterCategory(id, i);
                  }}
                >
                  <Link
                    to="/allproducts"
                    style={{ color: curIndex === i ? "#e3be96" : "#1f1f1f" }}
                  >
                    {ret.category}
                  </Link>
                </li>
              );
            })}
          </ul>
          {curCate.map((ret, i) => {
            return (
              <div className={`wA${i + 1}`} key={i}>
                <Link to={`/proDetail/${ret.id}`} className="w2I">
                  <img src={ret.mainPic} alt="" />
                </Link>
                <Link to={`/proDetail/${ret.id}`} className="w2P1">
                  <p>{ret.goods}</p>
                </Link>
                <p className="w2P2">￥{ret.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Navigator);
