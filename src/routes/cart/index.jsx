import React from "react";
import { Empty, Table, Checkbox, Button, Modal, message } from "antd";
import { Link } from "dva/router";
import Footer from "../../components/footer";
import Navigator from "../../components/navigator";
import QuantityButton from "../../components/quantity-button";
import cache from "../../utils/cache";
import request from "../../utils/request";
import "./index.scss";

const CartTitle = () => (
  <div className="cartHeader">
    <div className="cartTitle">
      <a href="/">
        <img src={require("../../assets/images/logo.png")} height="50" alt="" />
      </a>
      <span className="titleLabel">我的购物车</span>
    </div>
  </div>
);

const EmptyCart = () => (
  <div className="emptyCart">
    <Empty description={false} />
    <div className="label">购物车空空的，请前往商城首页去购物~</div>
    <div className="link">
      <Link to="/allproducts">
        去购物
        <span style={{ color: "#979797" }}>{"  >"}</span>
      </Link>
    </div>
  </div>
);

const cartFooter = ({
  onManualSelectAll,
  selectedRowKeys,
  quantities,
  goods,
  selectGoods,
  formatTotalPrice,
  history
}) => () => (
  <div className="cartFooter">
    <div className="selectAll">
      <Checkbox
        checked={selectedRowKeys.length === goods.length}
        onChange={onManualSelectAll}
        disabled={goods.length === 0}
      />
    </div>
    <span className="selectAllLabel actionItem">全选</span>
    <a className="batchDeleteItem actionItem">删除选中的商品</a>
    <a className="batchAddWishlist actionItem">移到我的收藏</a>
    <div className="cartResult">
      <span className="totalItem">
        已选
        <span className="totalCount">{selectedRowKeys.length}</span>
        种商品
      </span>
      <div className="totalPriceInfo">
        <div className="priceLine totalPrice">
          <span className="priceLabel">合计(不含运费)：</span>
          <span className="priceText cssPrice">
            <span>¥{formatTotalPrice()}</span>
          </span>
        </div>
        <div className="priceLine discountPrice">
          <span className="priceLabel">优惠：</span>
          <span className="priceText cssPrice">
            <span>¥0.0</span>
          </span>
        </div>
      </div>
      <div className="submitGroup">
        <Button
          className="submitBtn pay"
          // loading={loading}
          disabled={selectedRowKeys.length === 0}
          onClick={() => {
            goods.filter((ret, i) => selectedRowKeys.includes);
            history.push({
              pathname: "/settlement",
              state: {
                ids: selectedRowKeys,
                nums: quantities,
                goods: selectGoods
              }
            });
          }}
        >
          下单
        </Button>
        <Button
          className="submitBtn back"
          onClick={() => {
            history.push("/allproducts");
          }}
        >
          继续购物
        </Button>
      </div>
    </div>
  </div>
);

const ImageView = ({ info }) => (
  <div className="itemLogo">
    <Link to={`/prodetail/${info.id}`}>
      <img src={info.mainPic} alt="" />
    </Link>
  </div>
);

export default class Cart extends React.Component {
  tableColumns = [
    {
      title: "全选",
      dataIndex: "",
      width: 116,
      render: (text, row) => <ImageView info={row} />
    },
    {
      title: "商品信息",
      width: 330,
      dataIndex: "goods",
      render: (text, row) => {
        return (
          <div className="shopCartName">
            <div className="itemDescription">
              <div className="itemDescName cutwordsTwoLine" title={row.title}>
                <Link to={`/prodetail/${row.id}`}>{row.goods}</Link>
              </div>
              <div className="skuAttrs">{row.introduce}</div>
            </div>
          </div>
        );
      }
    },
    {
      title: "单价(元)",
      dataIndex: "price",
      render: (text, row) => <div className="cssPrice">{`¥ ${text}`}</div>
    },
    {
      title: "数量",
      width: 180,
      dataIndex: "quantity",
      render: (text, row) => (
        <QuantityButton
          quantity={text}
          stock={100}
          min={1}
          onChange={quantity => {
            this.onQunatityChange(quantity, row.id);
          }}
        />
      )
    },
    {
      title: "小计(元)",
      dataIndex: "",
      render: (text, row) => (
        <div className="itemSubtotalPrice">{`¥ ${row.price *
          row.quantity}`}</div>
      )
    },
    {
      title: "操作",
      dataIndex: "",
      className: "actions",
      render: (text, row) => (
        <div>
          <div>
            <a
              className="actionItem"
              href="javascript:;"
              onClick={() => this.deleteItem(row)}
            >
              删除
            </a>
          </div>
          <a
            className="actionItem"
            href="javascript:;"
            // onClick={this.addWishlist(row.cartLineId)}
          >
            移到我的收藏
          </a>
        </div>
      )
    }
  ];

  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      user: {},
      goods: [], // 购物车商品列表
      selectAll: false, // 当前是否是全选
      selectedRowKeys: [], //选中商品的id
      selectGoods: [], //选中的商品
      quantities: [], //选中商品对应的数量数组
      isFirstFetch: true //是否是第一次请求数据
    };
  }

  async componentDidMount() {
    const user = cache.getUser();
    this.setState({ user }, this.fetchGoods);
  }

  fetchGoods = async () => {
    const { user } = this.state;
    const { goods: preGoods, isFirstFetch } = this.state;
    const res = await request("getShopcartById", { body: { userId: user.id } });
    const {
      extend: { goods }
    } = res;
    goods.forEach((ret, i) => {
      if (isFirstFetch) {
        ret.quantity = 1; //第一次请求的时候置数量为1
        this.setState({ isFirstFetch: false });
      } else {
        const quantity = preGoods.find(item => item.id === ret.id).quantity;
        ret.quantity = quantity;
      }
    });
    this.setState({ goods });
  };

  deleteItem = row => {
    const { user } = this.state;
    Modal.confirm({
      title: "删除商品",
      content: "确认要删除选中商品吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        const res = await request("/delFromShopCart", {
          method: "DELETE",
          body: { userId: user.id, goodsId: row.id }
        });
        const { code } = res;
        if (code === 200) {
          message.success("删除成功！");
          this.fetchGoods();
        }
      }
    });
  };

  onSelectAll = (selected, selectedRows, changeRows) => {
    if (selected) {
      const { goods } = this.state;
      const { ids, quantities } = this.getAllRow();
      this.setState({ selectedRowKeys: ids, quantities, selectGoods: goods });
    } else {
      this.setState({ selectedRowKeys: [], quantities: [], selectGoods: [] });
    }
  };

  getAllRow() {
    const { goods } = this.state;
    const ids = [];
    const quantities = [];
    goods.forEach(i => {
      ids.push(i.id);
      quantities.push(i.quantity);
    });
    return { ids, quantities };
  }

  onManualSelectAll = e => {
    const { checked } = e.target;
    this.onSelectAll(checked, null, null);
  };

  onQunatityChange = (quantity, id) => {
    const { goods } = this.state;
    goods.find(i => i.id === id).quantity = quantity;
    this.setState({ goods });
  };

  formatTotalPrice = () => {
    const { goods, selectedRowKeys } = this.state;
    const selectGoods = goods.filter(i => selectedRowKeys.includes(i.id));
    return selectGoods.reduce((total, current) => {
      return current.quantity * current.price + total;
    }, 0);
  };

  render() {
    const { selectedRowKeys, quantities, goods, selectGoods } = this.state;
    return (
      <div className="shoppingCartBack">
        <Navigator />
        <CartTitle />
        {goods.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="shoppingCart">
            <div className="shoppingCartContent" />
            <div className="shoppingCartTitle">
              {`全部商品 ( ${goods.length || 0} ) `}
            </div>
            <Table
              rowKey="id"
              style={{ paddingBottom: 50 }}
              ref={this.tableRef}
              bordered={false}
              pagination={false}
              columns={this.tableColumns}
              dataSource={goods || null}
              rowSelection={{
                columnWidth: 46,
                onChange: (selectedRowKeys, selectedRows) => {
                  this.setState({ selectedRowKeys, selectGoods: selectedRows });
                },
                selectedRowKeys,
                onSelectAll: this.onSelectAll
              }}
              footer={cartFooter({
                onManualSelectAll: this.onManualSelectAll,
                selectedRowKeys,
                quantities,
                goods,
                selectGoods,
                formatTotalPrice: this.formatTotalPrice,
                history: this.props.history
              })}
            ></Table>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}
