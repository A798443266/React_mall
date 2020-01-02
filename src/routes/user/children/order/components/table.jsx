import React from "react";
import { Table } from "antd";
import { Link } from "dva/router";
import "./index.scss";

export default class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      expandedRowKeys: [],
      hoverId: ""
    };
    this.columns = [
      {
        title: "日期",
        dataIndex: "starttime"
      },
      {
        title: "订单号",
        dataIndex: "orderId",
        render: text => (
          <span style={{ fontSize: 12, fontWeight: "bold" }}>
            订单号：{text}
          </span>
        )
      },
      {
        title: "收货人",
        dataIndex: "name"
      },
      {
        title: "收货人电话",
        dataIndex: "phone"
      },
      {
        title: "收货地址",
        dataIndex: "address"
      },
      {
        title: "实付款",
        dataIndex: "money",
        render: text => (
          <span>
            ￥
            <span style={{ fontSize: 16, fontWeight: "bold", color: "red" }}>
              {text}
            </span>
          </span>
        )
      },
      {
        title: "操作",
        dataIndex: "",
        render: (text, row) => (
          <>
            <p className="action_od">订单详情</p>
            <p className="action_od">删除</p>
          </>
        )
      }
    ];
  }

  componentDidMount() {
    const { orders } = this.props;
    const expandedRowKeys = orders.map(ret => String(ret.id));
    this.setState({ expandedRowKeys });
  }

  onExpand = (expanded, record) => {
    let { expandedRowKeys } = this.state;
    if (expanded) {
      expandedRowKeys.push(String(record.goodsId));
    } else {
      //关闭
      expandedRowKeys = expandedRowKeys.filter(
        ret => String(record.goodsId) !== ret
      );
    }
    this.setState({ expandedRowKeys });
  };

  expandedRowRender = order => {
    const { orderDetails: details } = order;
    const columns = [
      {
        title: "",
        width: 120,
        dataIndex: "",
        render: (text, row) => (
          <div className="itemLogo_od">
            <Link to={`/prodetail/${row.goodsId}`}>
              <img src={row.mainPic} alt="" />
            </Link>
          </div>
        )
      },
      {
        title: "商品信息",
        width: 330,
        dataIndex: "goods",
        render: (text, row) => {
          return (
            <div className="itemDescription_od">
              <div className="itemDescName_od" title={row.title}>
                <Link to={`/prodetail/${row.goodsId}`}>{row.goodName}</Link>
              </div>
              <div className="skuAttrs_od">{row.introduce}</div>
            </div>
          );
        }
      },
      {
        title: "单价",
        dataIndex: "price",
        render: text => <span>￥{text}</span>
      },
      {
        title: "数量",
        dataIndex: "num",
        render: text => <span>x{text}</span>
      }
    ];
    return (
      <Table
        rowKey="goodsId"
        columns={columns}
        dataSource={details}
        pagination={false}
      />
    );
  };

  onHoverRow = record => {
    return {
      onMouseEnter: () => {
        this.setState({
          hoverId: record.id
        });
      }
    };
  };

  setRowClassName = record => {
    return record.id === this.state.hoverId ? "hoverRowStyl" : "";
  };

  render() {
    const { orders } = this.props;
    const { expandedRowKeys } = this.state;
    return (
      <div>
        <Table
          rowKey="id"
          dataSource={orders}
          columns={this.columns}
          // onExpand={this.onExpand}
          expandedRowRender={this.expandedRowRender}
          // expandRowByClick={true}
          // expandedRowKeys={expandedRowKeys}
          // onRow={this.onHoverRow}
          // rowClassName={this.setRowClassName}
        />
      </div>
    );
  }
}
