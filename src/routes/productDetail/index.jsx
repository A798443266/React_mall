import React from "react";
import { Breadcrumb, Button, message, Modal } from "antd";
import Navigator from "../../components/navigator";
import Footer from "../../components/footer";
import QuantityButton from "../../components/quantity-button";
import request from "../../utils/request";
import cache from "../../utils/cache";
import "./index.scss";

const maskWidth = 300;
const maskHeight = 300;
const containerWidth = 453;
const containerHeight = 453;
const rate = 300 / 453;

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      showMask: false, //移动遮罩
      good: {},
      subPics: [],
      curIndex: -1 //当前小图下标
    };
  }

  async componentDidMount() {
    //重置页面为顶部
    document.getElementById("root").scrollIntoView(true);
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const user = cache.getUser();
    const res = await request("/goodsById", { body: { id } });
    const {
      extend: { good }
    } = res;
    let { subPic: subPics } = good;
    subPics = subPics ? subPics.split(",") : [];
    this.setState({ good, subPics, user });
    // setTimeout(() => {
    //   console.log("---:", this.mask.offsetWidth);
    //   this.setState({
    //     maskWidth: this.mask.offsetWidth,
    //     maskHeight: this.mask.offsetHeight
    //   });
    // }, 100);
  }

  handleEnterMagnifiter = e => {
    this.setState({ showMask: true });
  };

  handleLeaveMagnifiter = e => {
    this.setState({ showMask: false });
  };

  getContainerXY = () => {
    return this.container.getBoundingClientRect();
  };

  handleMaskMove = e => {
    let left = 0;
    let top = 0;
    // 鼠标距离视口左边距离  大盒子距离左边视口的距离      小盒子遮罩宽度的一半
    left = e.clientX - this.getContainerXY().left - maskWidth / 2;
    top = e.clientY - this.getContainerXY().top - maskHeight / 2;
    if (left < 0) {
      left = 0;
    } else if (left > containerWidth - maskWidth) {
      left = containerWidth - maskWidth;
    }

    if (top < 0) {
      top = 0;
    } else if (top > containerHeight - maskHeight) {
      top = containerHeight - maskHeight;
    }
    this.mask.style.left = `${left}px`;
    this.mask.style.top = `${top}px`;

    // 移动大图
    left = -left / rate;
    top = -top / rate;
    this.bagImg.style.left = `${left}px`;
    this.bagImg.style.top = `${top}px`;
  };

  addCart = async () => {
    // message.success("添加成功!");
    const { user } = this.state;
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { code } = await request("/putShopCart", {
      method: "POST",
      body: {
        userId: user.id,
        goodsId: id
      }
    });
    if (code === 200) {
      Modal.confirm({
        title: "成功添加",
        content: "商品已经成功添加到购物车中，是否立即前往购物车结算？",
        okText: "立即前往",
        cancelText: "再看看",
        onOk: () => {
          this.props.history.push('/cart')
        },
      });
    } else if(code === 300) {
      message.info("此商品已经在购物车中了，无须重复添加哦~");
    } else {
      message.error("出错了");
    }
  };

  handleSubPic = index => {
    let { curIndex, subPics } = this.state;
    if (index === curIndex) return;
    this.bagImg.src = subPics[index];
    this.mainPic.src = subPics[index];
    curIndex = index;
    this.setState({ curIndex });
  };

  renderContainer() {
    const { showMask, good, curIndex, subPics } = this.state;
    return (
      <div className="container">
        <Breadcrumb className="breadcrumb" separator=">">
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>所有商品</Breadcrumb.Item>
          <Breadcrumb.Item>{good.goods}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="info">
          <div className="left-info">
            <div className="magnifier">
              <div
                className="magnifier-container"
                onMouseEnter={this.handleEnterMagnifiter}
                onMouseLeave={this.handleLeaveMagnifiter}
                onMouseMove={this.handleMaskMove}
                ref={ref => (this.container = ref)}
              >
                {/* <!--当前图片显示容器--> */}
                <div className="images-cover">
                  <img
                    src={good.mainPic}
                    alt=""
                    ref={ref => {
                      this.mainPic = ref;
                    }}
                  />
                </div>
                {/* 跟随鼠标移动的遮罩 */}
                <div
                  className="move-view"
                  style={{ display: showMask ? "block" : "none" }}
                  ref={ref => {
                    this.mask = ref;
                  }}
                ></div>
              </div>
              <div className="magnifier-assembly">
                <ul>
                  {subPics.map((ret, i) => {
                    return (
                      <li
                        key={i}
                        className={curIndex === i ? "active" : ""}
                        onClick={() => {
                          this.handleSubPic(i);
                        }}
                      >
                        <div className="small-img">
                          <img src={ret} alt="" />
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {/* 缩略图 */}
              </div>
              {/* 经过放大的图片显示容器 */}
              <div
                className="magnifier-view"
                style={{ display: showMask ? "block" : "none" }}
              >
                <img
                  src={good.mainPic}
                  ref={ref => {
                    this.bagImg = ref;
                  }}
                />
              </div>
            </div>
          </div>
          <div className="right-info">
            <p className="p1">{good.goods}</p>
            <p className="p2">{good.introduce}</p>
            <p className="p3">
              <span className="s1">￥{good.price}</span>
              <span className="s2">已售出{good.sold}件</span>
            </p>
            <p className="p_"></p>
            <p className="p4">选择数量</p>
            <p className="p5">
              <QuantityButton
                quantity={1}
                stock={100}
                min={1}
                onChange={quantity => {
                  console.log(quantity);
                }}
              />
              <span className="s4">件（库存{good.reserve}件）</span>
            </p>
            <Button
              type="primary"
              className="add-car"
              size="large"
              onClick={this.addCart}
            >
              加入购物车
            </Button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="pro-wrap">
        <Navigator />
        {this.renderContainer()}
        <Footer />
      </div>
    );
  }
}

export default ProductDetail;
