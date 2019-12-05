import React, { createRef } from "react";
import { Breadcrumb, Button, message } from "antd";
import Navigator from "../../components/navigator";
import Footer from "../../components/footer";
import QuantityButton from "../../components/quantity-button";
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
      showMask: false //移动遮罩
    };
  }

  componentDidMount() {
    setTimeout(() => {
      console.log("---:", this.mask.offsetWidth);
      this.setState({
        maskWidth: this.mask.offsetWidth,
        maskHeight: this.mask.offsetHeight
      });
    }, 100);
  }

  handleEnterMagnifiter = e => {
    this.setState({ showMask: true });
  };

  handleLeaveMagnifiter = e => {
    this.setState({ showMask: false });
  };

  getContainerXY = () => {
    return this.container.getBoundingClientRect();
  }

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

  addCart = e => {
    message.success('添加成功!')
  }

  renderContainer() {
    const { showMask } = this.state;
    return (
      <div className="container">
        <Breadcrumb className="breadcrumb" separator=">">
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>所有商品</Breadcrumb.Item>
          <Breadcrumb.Item>经典系列时钟</Breadcrumb.Item>
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
                  <img src={require("./images/img42.png")} alt="" />
                </div>
                {/* 跟随鼠标移动的遮罩 */}
                <div
                  className="move-view"
                  style={{ display: showMask ? "block" : "none" }}
                  ref={ref => (this.mask = ref)}
                ></div>
              </div>
              <div className="magnifier-assembly">
                <ul>
                  <li>
                    <div className="small-img">
                      <img src={require("./images/img46.png")} />
                    </div>
                  </li>
                  <li>
                    <div className="small-img">
                      <img src={require("./images/img47.png")} />
                    </div>
                  </li>
                  <li>
                    <div className="small-img">
                      <img src={require("./images/img43.png")} />
                    </div>
                  </li>
                  <li>
                    <div className="small-img">
                      <img src={require("./images/img42.png")} />
                    </div>
                  </li>
                </ul>
                {/* 缩略图 */}
              </div>
              {/* 经过放大的图片显示容器 */}
              <div
                className="magnifier-view"
                style={{ display: showMask ? "block" : "none" }}
              >
                <img
                  src={require("./images/img42.png")}
                  ref={ref => (this.bagImg = ref)}
                />
              </div>
            </div>
          </div>
          <div className="right-info">
            <p className="p1">经典系列时钟</p>
            <p className="p2">精选材料，设计大师设计，做工精细，家居必备品</p>
            <p className="p3">
              <span className="s1">￥580</span>
              <span className="s2">已售出0件</span>
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
              <span className="s4">件（库存100件）</span>
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
