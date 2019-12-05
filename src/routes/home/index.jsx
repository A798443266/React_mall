import React, { Component } from "react";
import { Carousel, Icon, BackTop } from "antd";
import Navigator from "../../components/navigator";
import Footer from '../../components/footer'
import "./index.scss";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Navigator />
        <div className="home_wrap">
          <BackTop/>
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
            <p className="p1">新品推荐，精心挑选</p>
            <p className="p2">家居必备实用小单品</p>
            <section className='d1'>
              <Icon type="left" className='icon left'/>
              <Icon type="right" className='icon right'/>
              <div className='wrap'>
                <div>
                  <a href="" className='img-wrap'>
                    <img src={require('./images/img21.png')} alt="" />
                  </a>
                  <p className="p11">
                    <a href="">便携简约清扫扫帚</a>
                  </p>
                  <p className="p12">
                    <a href="">￥580.00</a>
                  </p>
                </div>
                <div>
                  <a href="" className='img-wrap'>
                    <img src={require('./images/img22.png')} alt="" />
                  </a>
                  <p className="p11">
                    <a href="">便携简约清扫扫帚</a>
                  </p>
                  <p className="p12">
                    <a href="">￥580.00</a>
                  </p>
                </div>
                <div>
                  <a href="" className='img-wrap'>
                    <img src={require('./images/img23.png')} alt="" />
                  </a>
                  <p className="p11">
                    <a href="">便携简约清扫扫帚</a>
                  </p>
                  <p className="p12">
                    <a href="">￥580.00</a>
                  </p>
                </div>
                <div>
                  <a href="" className='img-wrap'>
                    <img src={require('./images/img24.png')} alt="" />
                  </a>
                  <p className="p11">
                    <a href="">便携简约清扫扫帚</a>
                  </p>
                  <p className="p12">
                    <a href="">￥580.00</a>
                  </p>
                </div>
                <div>
                  <a href="" className='img-wrap'>
                    <img src={require('./images/img25.png')} alt="" />
                  </a>
                  <p className="p11">
                    <a href="">便携简约清扫扫帚</a>
                  </p>
                  <p className="p12">
                    <a href="">￥580.00</a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
