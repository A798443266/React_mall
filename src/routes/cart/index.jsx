import React from "react";
import { Empty, Table, Checkbox, Button, Modal } from "antd";
import Footer from "../../components/footer";
import Navigator from "../../components/navigator";
import QuantityButton from "../../components/quantity-button";
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
      <a href="/searchItem?q=">
        去购物
        <span style={{ color: "#979797" }}>{"  >"}</span>
      </a>
    </div>
  </div>
);

const cartFooter = ({
  onManualSelectAll,
  selectedRowKeys,
  tableList,
  formatTotalPrice
}) => () => (
  <div className="cartFooter">
    <div className="selectAll">
      <Checkbox
        checked={selectedRowKeys.length === tableList.length}
        onChange={onManualSelectAll}
        disabled={tableList.length === 0}
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
          // onClick={submit}
          // disabled={cartSummary.checkedLines === 0}
        >
          下单
        </Button>
        <Button
          className="submitBtn back"
          onClick={() => {
            window.location.href = "/allproducts";
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
    <a href={`/proDetail:id=1`}>
      <img src={require("../home/images/img25.png")} />
    </a>
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
      dataIndex: "title",
      render: (text, row) => {
        return (
          <div className="shopCartName">
            <div className="itemDescription">
              <div className="itemDescName cutwordsTwoLine" title={row.title}>
                <a href={`/proDetail:id=${row.id}`}>{row.title}</a>
              </div>
              <div className="skuAttrs">这里是商品的详细描述</div>
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
      dataIndex: "summaryPrice",
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
            <a className="actionItem" onClick={() => this.deleteItem(row)}>
              删除
            </a>
          </div>
          <a
            className="actionItem"
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
      selectAll: false,
      selectedRowKeys: [],
      cartGroup: {
        name: "自营",
        totalItems: 1,
        totalLines: 1
      },
      tableList: [
        {
          id: 1,
          title: "名称",
          price: 23,
          quantity: 1,
          summaryPrice: 23
        },
        {
          id: 2,
          title: "名称",
          price: 23,
          quantity: 1,
          summaryPrice: 23
        }
      ]
    };
  }

  deleteItem = row => {
    Modal.confirm({
      title: "删除商品",
      content: "确认要删除选中商品吗？",
      okText: "确定",
      cancelText: "取消"
    });
  };

  onSelectAll = (selected, selectedRows, changeRows) => {
    if (selected) {
      this.setState({ selectedRowKeys: this.getAllRowKeys() });
    } else {
      this.setState({ selectedRowKeys: [] });
    }
  };

  getAllRowKeys() {
    const { tableList } = this.state;
    const keys = [];
    tableList.forEach(i => keys.push(i.id));
    return keys;
  }

  onManualSelectAll = e => {
    const { checked } = e.target;
    this.onSelectAll(checked, null, null);
  };

  onQunatityChange = (quantity, id) => {
    const { tableList } = this.state;
    tableList.find(i => i.id === id).quantity = quantity;
    this.setState({
      ...this.state,
      tableList
    });
  };

  formatTotalPrice = () => {
    const { tableList, selectedRowKeys } = this.state;
    const selectRow = tableList.filter(i => selectedRowKeys.includes(i.id));
    return selectRow.reduce((total, current) => {
      return current.quantity * current.price + total;
    }, 0);
  };

  render() {
    const { tableList, selectedRowKeys } = this.state;
    return (
      <div className="shoppingCartBack">
        <Navigator />
        <CartTitle />
        {tableList.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="shoppingCart">
            <div className="shoppingCartContent" />
            <div className="shoppingCartTitle">
              {`全部商品 ( ${tableList.length || 0} ) `}
            </div>
            <Table
              rowKey="id"
              style={{ paddingBottom: 50 }}
              ref={this.tableRef}
              bordered={false}
              pagination={false}
              columns={this.tableColumns}
              dataSource={tableList || null}
              rowSelection={{
                columnWidth: 46,
                onChange: (selectedRowKeys, selectedRows) => {
                  this.setState({ selectedRowKeys });
                },
                selectedRowKeys,
                onSelectAll: this.onSelectAll
              }}
              footer={cartFooter({
                onManualSelectAll: this.onManualSelectAll,
                selectedRowKeys,
                tableList,
                formatTotalPrice: this.formatTotalPrice
              })}
            ></Table>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}
