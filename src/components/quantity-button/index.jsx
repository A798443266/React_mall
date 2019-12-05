import React from "react";
import { Button, Input } from "antd";
import styles from "./index.scss";

export default class QuantityButton extends React.Component {
  state = {
    quantity: 1,
    stock: 0,
    min: 1
  };
  
  componentWillMount() {
    const { quantity, stock, min } = this.props
    this.setState({ quantity, stock, min })
  }
  updateQuantity(type) {
    const { quantity, stock } = this.state;
    if (type === "add") {
      if (quantity < stock) {
        this.setState({
          quantity: quantity + 1
        }, () => {
          this.exculuteCb(quantity + 1)
        });
      }
    } else {
      if (quantity > 1) {
        this.setState({
          quantity: quantity - 1
        }, () => {
          this.exculuteCb(quantity - 1)
        });
      }
    }
  }

  exculuteCb = value => {
    const { onChange } = this.props
    if (typeof onChange === 'function') {
      onChange(value)
    }
  }

  onQuantityChange = e => {
    let value = Number(e.target.value)
    if (value === 0) return
    if (!isNaN(value)) {
      this.setState({
        quantity: value,
      }, () => {
        this.exculuteCb(value)
      })
    }
  }

  render() {
    const { quantity = 1, stock = 0, min = 1 } = this.state;
    let { disabled = false } = this.props;
    disabled = disabled || stock === 0 || quantity > stock;
    return (
      <div className='itemAmountMain'>
        <Button
          className='actionLeft'
          // disabled={quantity > 1}
          onClick={this.updateQuantity.bind(this, "reduce")}
        >
          -
        </Button>
        <Input
          type="text"
          defaultValue={min || 1}
          // disabled={disabled}
          value={quantity}
          onChange={this.onQuantityChange}
          className='itemAmountInput'
        />
        <Button
          className='actionRight'
          // disabled={quantity < stock}
          onClick={this.updateQuantity.bind(this, "add")}
        >
          +
        </Button>
      </div>
    );
  }
}
