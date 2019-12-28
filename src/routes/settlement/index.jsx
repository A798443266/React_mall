import React from "react";
import { Link } from "dva/router";
import {
  Card,
  Select,
  Form,
  Button,
  Row,
  Col,
  Radio,
  Steps,
  Result,
  Input,
  Modal,
  Message
} from "antd";
import Footer from "../../components/footer";
import "./index.scss";
import request from "../../utils/request";
import cache from "../../utils/cache";

const { Option } = Select;
const { Step } = Steps;

// this.props.location.state

class Settlement extends React.Component {
  state = {
    addArr: [],
    current: 1,
    goods: [],
    name: "",
    phone: "",
    address: "",
    showModal: false,
    orderId: "" // 返回的订单id
  };

  renderCartTitle = () => {
    const { current } = this.state;
    return (
      <div className="cartHeader_od">
        <div className="cartTitle_od">
          <Link to="/">
            <img
              src={require("../../assets/images/logo.png")}
              height="50"
              alt=""
            />
          </Link>
          <div>
            <span className="titleLabel_od">结算页</span>
            <div>
              <Steps current={current}>
                <Step title="我的购物车" />
                <Step title="填写核对订单信息" />
                <Step title="成功提交订单" />
              </Steps>
            </div>
          </div>
        </div>
      </div>
    );
  };

  async componentDidMount() {
    const { state } = this.props.location;
    const user = cache.getUser();
    if (state) {
      const { goods } = state;
      this.setState({ goods });
    }
    this.setState({ user });
    if (user.id) {
      const res = await request("/getAddress", { body: { userId: user.id } });
      const { code, extend } = res;
      if (code === 200) {
        const { address } = extend;
        this.setState({ addArr: address });
      }
    }
  }

  confirmOrder = () => {
    this.props.form.validateFields(
      ["address", "name", "phone"],
      async (err, values) => {
        if (!err) {
          this.setState({ showModal: true, ...values });
        }
      }
    );
  };

  //提交订单
  submit = () => {
    this.props.form.validateFields(["password"], async (err, values) => {
      if (err) return;
      const { id } = this.state.user;
      if (!id) {
        Message.error("您还没有登录！");
        this.setState({ showModal: false });
        return;
      }
      const { name, phone, address, goods } = this.state;
      const od = goods.map((ret, i) => ({
        goodsId: ret.id,
        price: ret.price,
        num: ret.quantity
      }));
      const res = await request("/submitOrder", {
        method: "POST",
        body: {
          userId: id,
          password: values.password,
          name,
          phone,
          address,
          money: this.getTotalPrice(),
          od
        }
      });
      const { code, extend } = res;
      if (code === 500) {
        Message.error("密码不正确!");
        return;
      }
      const { orderId } = extend;
      this.setState({
        current: 2,
        showModal: false,
        orderId
      });
    });
  };

  // 计算总价格
  getTotalPrice = () => {
    const { goods } = this.state;
    return goods.reduce((total, current) => {
      return current.quantity * current.price + total;
    }, 0);
  };

  render() {
    const {
      addArr,
      goods,
      showModal,
      orderId,
      phone,
      name,
      address,
      current
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <div className="container_od">
          {this.renderCartTitle()}
          <div style={{ display: current === 1 ? "block" : "none" }}>
            <p>填写并核对订单信息</p>
            <div className="info_od">
              <Card
                title="收货人信息"
                bordered={false}
                extra={<a href="#">管理收获地址</a>}
              >
                <p className="text_od">收货地址：</p>
                <Form.Item>
                  {getFieldDecorator("address", {
                    rules: [{ required: true, message: "请选择收货地址!" }]
                  })(
                    <Select
                      style={{ width: 450 }}
                      placeholder="请选择收货地址"
                      showSearch
                      optionFilterProp='children'
                    >
                      {addArr.map((ret, i) => {
                        return (
                          <Option key={ret.id} value={ret.address}>
                            {ret.address}
                            <span
                              style={{
                                fontWeight: "bold",
                                color: "#0d62a3",
                                marginLeft: 80
                              }}
                            >
                              {ret.isDefault ? "(默认)" : ""}
                            </span>
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
                <p className="text_od">收货姓名：</p>
                <Form.Item>
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "请输入收货人姓名!",
                        whitespace: true
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入收货人姓名"
                      style={{ width: 200 }}
                    />
                  )}
                </Form.Item>
                <p className="text_od">收货人手机：</p>
                <Form.Item>
                  {getFieldDecorator("phone", {
                    rules: [
                      {
                        required: true,
                        message: "请输入收货人手机号码!",
                        whitespace: true
                      },
                      {
                        pattern: /^1\d{10}$/,
                        message: "请输入正确的手机号码!"
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入收货人电话号码"
                      style={{ width: 200 }}
                    />
                  )}
                </Form.Item>
              </Card>
              <Card title="支付方式" bordered={false}>
                <Radio.Group defaultValue={1}>
                  <Radio.Button value={1}>在线支付</Radio.Button>
                  <Radio.Button value={2}>货到付款</Radio.Button>
                </Radio.Group>
              </Card>
              <Card title="送货清单" bordered={false}>
                {goods.map((ret, i) => {
                  return (
                    <Row style={{ paddingBottom: 10 }} gutter={4} key={i}>
                      <Col span={3} style={{ overflow: "hidden" }}>
                        <img
                          src={ret.mainPic}
                          alt=""
                          style={{ display: "block", width: 100, height: 100 }}
                        />
                      </Col>
                      <Col span={10}>
                        <p style={{ fontSize: 14, fontWeight: "bold" }}>
                          {ret.goods}
                        </p>
                        <p style={{ fontSize: 12 }}>{ret.introduce}</p>
                      </Col>
                      <Col span={4}>
                        <p style={{ color: "#e4393c", fontWeight: 700 }}>
                          ￥ <span>{ret.price}</span>
                        </p>
                      </Col>
                      <Col span={4}>
                        <p>x{ret.quantity}</p>
                      </Col>
                      <Col span={3}>
                        <p style={{ fontSize: 12 }}>有货</p>
                      </Col>
                    </Row>
                  );
                })}
              </Card>
            </div>
            <div className="footer-info_od">
              <div className="wrap2_od">
                <Button
                  icon="arrow-left"
                  style={{ marginRight: 10, height: 35 }}
                  onClick={() => {
                    this.props.history.replace("/cart");
                  }}
                >
                  返回购物车
                </Button>
                <Button
                  type="primary"
                  style={{
                    fontWeight: 900,
                    width: 130,
                    fontSize: 18,
                    color: "#fff",
                    height: 35
                  }}
                  onClick={this.confirmOrder}
                >
                  提交订单
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Modal
          title="请确认订单并输入密码"
          visible={showModal}
          onOk={this.submit}
          onCancel={() => {
            this.setState({ showModal: false });
          }}
          okText="提交"
          cancelText="我再想想"
        >
          <div className="wrap1_od">
            <div>
              <p className="price-info_od">
                实付款：
                <span>
                  ￥<span>{this.getTotalPrice()}</span>
                </span>
              </p>
              <p className="addr-info_od">
                寄送至：
                <span>{address}</span>
              </p>
              <p className="person-info_od">
                收货人：<span className="name_od">{name}</span>
              </p>
              <p className="person-info_od">
                联系方式：<span className="phone_od">{phone}</span>
              </p>
            </div>
          </div>
          <Form.Item label="请输入密码：" style={{ marginTop: 20 }}>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "请输入密码!",
                  whitespace: true
                }
              ]
            })(<Input placeholder="请输入密码" style={{ width: 300 }} />)}
          </Form.Item>
        </Modal>

        <Result
          style={{ display: current === 2 ? "block" : "none" }}
          status="success"
          title="支付成功!"
          subTitle={`订单号：${orderId}`}
          extra={[
            <Button
              type="primary"
              key="home"
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              返回首页
            </Button>,
            <Button
              key="buy"
              onClick={() => {
                this.props.history.push("/allproducts");
              }}
            >
              继续购物
            </Button>
          ]}
        />
        <Footer />
      </>
    );
  }
}

export default Form.create()(Settlement);
