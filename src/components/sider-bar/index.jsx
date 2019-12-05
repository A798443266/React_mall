import React from "react";
import { Tree, Icon } from "antd";
import "./index.scss";

const { TreeNode } = Tree;

export default class SiderBar extends React.Component {

  onSelect = (selectedKeys, e) => {
    switch (selectedKeys[0]) {
      case '2':
        window.location.href = '/cart'
        break
      default: break  
    }
  }

  render() {
    return (
      <Tree
        showIcon
        defaultExpandAll
        defaultSelectedKeys={["0"]}
        switcherIcon={<Icon type="down" />}
        style={{ marginLeft: 5 }}
        onSelect={this.onSelect}
      >
        <TreeNode icon={<Icon type="account-book" />} title="订单中心" key="0">
          <TreeNode title="我的订单" key="0-1" />
          <TreeNode title="我的评价" key="0-2" />
        </TreeNode>
        <TreeNode icon={<Icon type="wallet" />} title="我的钱包" key="1">
          <TreeNode title="优惠券" key="1-1" />
          <TreeNode title="我的评价" key="1-2" />
        </TreeNode>
        <TreeNode icon={<Icon type="shopping-cart" />} title="我的购物车" key="2" />
        <TreeNode icon={<Icon type="alert" />} title="我的关注" key="3">
          <TreeNode title="关注商品" key="3-1" />
          <TreeNode title="关注店铺" key="3-2" />
        </TreeNode>
        <TreeNode icon={<Icon type="book" />} title="我的收藏" key="4" />
        <TreeNode icon={<Icon type="smile" />} title="收获地址" key="5" />
        <TreeNode icon={<Icon type="setting" />} title="设置" key="6" />
      </Tree>
    );
  }
}
