import React from "react";
import { Form, Button, Input, Icon, Checkbox, notification } from "antd";
import { connect } from "dva";
import Navigator from "../../components/navigator";
import Footer from "../../components/footer";
import cache from '../../utils/cache'
import "./index.scss";

class Login extends React.Component {
  state = {
    isLogin: true
  };
  componentWillMount() {
    // 防止用户直接在地址栏输入/login，这样没有传参不存在state对象
    if (!this.props.location.state) return;
    const { isLogin = true } = this.props.location.state;
    this.setState({ isLogin });
  }

  handleLogin = () => {
    this.props.form.validateFields(
      ["username", "password"],
      async (err, values) => {
        if (!err) {
          const data = { phone: values.username, password: values.password };
          const res = await this.props.login(data);
          const { code, msg, user } = res;
          if (code === 200) {
            notification.success({ message: "登陆成功！" });
            cache.saveUser(user)
            this.props.history.push('/')
          } else {
            notification.error({ message: msg });
          }
        }
      }
    );
  };

  handleRegiter = () => {
    this.props.form.validateFields(
      ["registerName", "pwd", "pwd1"],
      (err, values) => {
        if (!err) {
          const { isLogin } = this.state;
          notification.success({ message: "注册成功！" });
        }
      }
    );
  };

  comfirePassWord = (rule, value, cb) => {
    const pwd = this.props.form.getFieldValue("pwd");
    if (value !== pwd) {
      cb("两次密码不相等");
    } else {
      cb();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLogin } = this.state;
    return (
      <>
        <Navigator validMouse={false} />
        <div className="contain">
          <div className="login_wrap">
            <p>{isLogin ? "登陆" : "注册"}</p>
            <div>
              <Form
                className="login-form"
                style={{ display: isLogin ? "block" : "none" }}
              >
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [{ required: true, message: "请输入账户" }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="手机/邮箱/用户"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [{ required: true, message: "请输入密码!" }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="请输入密码"
                    />
                  )}
                </Form.Item>
                <Button
                  type="primary"
                  className="login-form-button"
                  onClick={this.handleLogin}
                >
                  登陆
                </Button>
                <Form.Item>
                  {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true
                  })(<Checkbox>记住我</Checkbox>)}
                </Form.Item>
                <p>
                  <a href="javascript:;" style={{ float: "left" }}>
                    忘记密码？
                  </a>
                  <a
                    href="javascript:;"
                    style={{ float: "right" }}
                    onClick={() => {
                      this.props.form.resetFields(["username", "password"]);
                      this.setState({ isLogin: false });
                    }}
                  >
                    立即注册
                  </a>
                </p>
              </Form>

              <Form
                className="login-form"
                style={{ display: !isLogin ? "block" : "none" }}
                onSubmit={this.handleSubmit}
              >
                <Form.Item>
                  {getFieldDecorator("registerName", {
                    rules: [{ required: true, message: "请输入账户" }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="手机/邮箱/用户"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("pwd", {
                    rules: [{ required: true, message: "请输入密码!" }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="请输入密码"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("pwd1", {
                    validateFirst: true,
                    rules: [
                      { required: true, message: "请确认密码" },
                      { validator: this.comfirePassWord }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="请确认密码"
                    />
                  )}
                </Form.Item>
                <p className="tip">
                  已有账号？请
                  <span
                    onClick={() => {
                      this.props.form.resetFields([
                        "registerName",
                        "pwd",
                        "pwd1"
                      ]);
                      this.setState({ isLogin: true });
                    }}
                  >
                    直接登陆
                  </span>
                </p>
                <Button
                  type="primary"
                  className="login-form-button"
                  onClick={this.handleRegiter}
                >
                  立即注册
                </Button>
              </Form>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
const mapStateToProps = ({ app: { username } }) => ({ username });

const mapDispatchToProps = dispatch => {
  return {
    async login(data) {
      const res = await dispatch({ type: "app/login", payload: { data } });
      return res;
    },
    saveUser(username) {
      dispatch({ type: "app/saveUser", payload: { username } });
    },
  }
}
export default Form.create()(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
