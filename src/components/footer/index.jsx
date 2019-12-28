import React from "react";
import { Link } from "dva/router";
import './index.scss'

export default class Footer extends React.Component {
  render() {
    return (
      <>
        <div className="d6">
          <div className="d61">
            <div className="d611">
              <a href="">
                <img src={require("./images/logo.png")} alt="" />
              </a>
              <p>
                青竹良品原创生活类电商品牌，秉承一贯的严谨态度，我们深入世界各地，从源头全程严格把控商品生产环节，力求帮消费者甄选到最优质的商品，全线采用天然原材料，控制甲醛低量无害，采用进口工艺，国际生产线不断优化，食材保证核心原产地新鲜直供，让你享受品质生活
              </p>
            </div>
            <div className="d612">
              <ul className="ul61">
                <li className="li61">
                  <a href="">关于我们</a>
                </li>
                <li className="li62">
                  <a href="">我的品牌</a>
                </li>
                <li className="li62">
                  <a href="">公司动态</a>
                </li>
                <li className="li62">
                  <a href="">经历发展</a>
                </li>
                <li className="li62">
                  <a href="">商品推广</a>
                </li>
              </ul>
              <ul className="ul62">
                <li className="li61">
                  <a href="">支付方式</a>
                </li>
                <li className="li62">
                  <a href="">微信支付</a>
                </li>
                <li className="li62">
                  <a href="">支付宝</a>
                </li>
                <li className="li62">
                  <a href="">百度钱包</a>
                </li>
                <li className="li62">
                  <a href="">货到付款</a>
                </li>
              </ul>
              <ul className="ul63">
                <li className="li61">
                  <a href="">相关服务</a>
                </li>
                <li className="li62">
                  <a href="">退货政策</a>
                </li>
                <li className="li62">
                  <a href="">购物流程</a>
                </li>
                <li className="li62">
                  <a href="">客服服务</a>
                </li>
                <li className="li62">
                  <a href="">商务合作</a>
                </li>
              </ul>
            </div>
            <div className="d613">
              <div className="weixin">
                <img src={require("./images/img72.png")} alt="" />
                <p>微博公众号</p>
              </div>
              <div className="weibo">
                <img src={require("./images/img71.png")} alt="" />
                <p>微信公众号</p>
              </div>
            </div>
          </div>
          <div className="d62">
            <div className="d621">
              <p className="p61">粤ICP备12043194号 © 2017youhaosuda.com</p>
              <p className="p62">
                <img
                  src={require("./images/img81.png")}
                  alt=""
                  title="微信支付"
                />
                <img
                  src={require("./images/img82.png")}
                  alt=""
                  title="支付宝"
                />
                <img
                  src={require("./images/img83.png")}
                  alt=""
                  title="百度钱包"
                />
                <img
                  src={require("./images/img84.png")}
                  alt=""
                  title="财付通"
                />
                <img src={require("./images/img85.png")} alt="" title="快钱" />
                <img
                  src={require("./images/img86.png")}
                  alt=""
                  title="货到付款"
                />
                <img
                  src={require("./images/img87.png")}
                  alt=""
                  title="银行卡"
                />
              </p>
              <div className="d622">
                <ul>
                  <li>
                    <p className="p621">
                      <img
                        src={require("./images/img901.png")}
                        alt=""
                        className="img61"
                      />
                      <img
                        src={require("./images/img90.png")}
                        alt=""
                        className="img62"
                      />
                    </p>
                  </li>
                  <li>
                    <p className="p621">
                      <img
                        src={require("./images/img891.png")}
                        alt=""
                        className="img61"
                      />
                      <img
                        src={require("./images/img89.png")}
                        alt=""
                        className="img62"
                      />
                    </p>
                  </li>
                  <li>
                    <p className="p621">
                      <img
                        src={require("./images/img881.png")}
                        alt=""
                        className="img61"
                      />
                      <img
                        src={require("./images/img88.png")}
                        alt=""
                        className="img62"
                      />
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="d7">
          <p>
            <span className="s71">
              <Link to="#">
                <img src={require("./images/img91.png")} alt="" />
              </Link>
            </span>
            <span className="s72">|</span>
            <span className="s73">
              <Link to="#">由友好速搭提供技术与服务支持</Link>
            </span>
          </p>
        </div>
      </>
    );
  }
}
