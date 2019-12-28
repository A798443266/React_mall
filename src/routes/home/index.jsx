import React, { Component } from "react";
import { Carousel, Icon, BackTop } from "antd";
import { Link } from "dva/router";
import Navigator from "../../components/navigator";
import Footer from "../../components/footer";
import request from "../../utils/request";
import styles from "./index.scss";

export default class Home extends Component {
  state = {
    ActWithGood: [
      //首页展示的活动商品
      { activity: {}, good: [] },
      { activity: {}, good: [] },
      { activity: {}, good: [] },
      { activity: {}, good: [] }
    ]
  };

  async componentDidMount() {
    document.getElementById("root").scrollIntoView(true);
    const res = await request("/acting");
    const {
      extend: { ActWithGood }
    } = res;
    this.setState({ ActWithGood });
  }

  render() {
    const { ActWithGood } = this.state;
    if (ActWithGood[0].good.length > 4) {
      ActWithGood[0].good = ActWithGood[0].good.slice(0, 4);
    }
    return (
      <div>
        <Navigator />
        <div className="home_wrap">
          <BackTop />
          <Carousel autoplay>
            <div>
              <img src={require("./images/1.png")} alt="" />
            </div>
            <div>
              <img src={require("./images/2.png")} alt="" />
            </div>
            <div>
              <img src={require("./images/3.png")} alt="" />
            </div>
          </Carousel>
          <div className="w">
            <p className="p1">{ActWithGood[0].activity.activityName}</p>
            <p className="p2">{ActWithGood[0].activity.content}</p>
            <section className="d1">
              <Icon type="left" className="icon left" />
              <Icon type="right" className="icon right" />
              <div className="wrap">
                {ActWithGood[0].good.map((ret, i) => {
                  return (
                    <div key={i}>
                      <Link to={`/proDetail/${ret.id}`} className="img-wrap">
                        <img src={ret.mainPic} alt="" />
                      </Link>
                      <p className="p11">
                        <Link to={`/proDetail/${i}`}>{ret.goods}</Link>
                      </p>
                      <p className="p12">
                        <Link to={`/proDetail/${i}`}>￥{ret.price}</Link>
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="d2">
              <p className="p1">{ActWithGood[1].activity.activityName}</p>
              <p className="p2">{ActWithGood[1].activity.content}</p>
              <ul>
                {ActWithGood[1].good.map((ret, i) => (
                  <li className={`pic pic${i + 1}`} key={i}>
                    <Link to={`/proDetail/${ret.id}`}>
                      <img src={ret.mainPic} alt="" />
                    </Link>
                    <span
                      onClick={() => {
                        this.props.history.push(`/proDetail/${ret.id}`);
                      }}
                    ></span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="d3">
              <p className="p1">{ActWithGood[2].activity.activityName}</p>
              <p className="p2">{ActWithGood[2].activity.content}</p>
              <ul>
                {ActWithGood[2].good.map((ret, i) => {
                  return (
                    <li key={i}>
                      <Link to={`/proDetail/${ret.id}}`}>
                        <img src={ret.mainPic} alt="" />
                      </Link>
                      <p
                        className="p1"
                        onClick={() => {
                          this.props.history.push(`/proDetail/${ret.id}`);
                        }}
                      >
                        {ret.goods}
                      </p>
                      <p className="p2">
                        ￥<span>{ret.price}</span>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* <section className="d4">
              <p className="p1">全球大牌优选，买手用心挑选</p>
              <p className="p2">全球好货，原装正品</p>
            </section> */}
          </div>
          <section className="d5">
            <p className="p1">{ActWithGood[3].activity.activityName}</p>
            <p className="p2">{ActWithGood[3].activity.content}</p>
            <div className="w d4wrap">
              {ActWithGood[3].good.map((ret, i) => {
                return (
                  <div key={i}>
                    <Link to={`/proDetail/${ret.id}}`} title="">
                      <img src={ret.mainPic} alt="" />
                    </Link>
                    <div className="cont">
                      <div className="tit">
                        <h4>{ret.goods}</h4>
                        <span>￥{ret.price}</span>
                      </div>
                      <p className="desc">{ret.introduce}</p>
                      {/* <p class="time">
                        <span>alice</span>
                        <span>2016-12-16</span>
                        <span>09:59</span>
                      </p> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}
