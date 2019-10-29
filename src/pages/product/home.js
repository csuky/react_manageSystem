import React, { Component } from 'react'
import {Card, Button, Icon, Table, message, Input, Select} from 'antd'
import throttle from 'lodash.throttle'

import { reqProducts, reqSearchProducts } from "../../api";
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/Constants'
import memoryUtils from '../../utils/memoryUtils';

const Option = Select.Option;

/**
 * 商品管理的首页组件
 */
export default class ProductHome extends Component {

  state = {
    loading: false,
    products: [],  //商品列表
    total: 0, //商品总数量
    searchType: 'productName', // 默认是按商品名称搜索
    searchName: '', // 搜索的关键字
  };

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'prcie',
        render: (price) => '￥' + price
      },
      {
        title: '状态',
        width: 100,
        dataIndex: 'status',
        render: (status) => {
          let btnText = '下架';
          let text = '在售';
          if (status===2) {
            btnText = '上架';
            text = '已下架'
          }
          return (
              <span>
                <button>{btnText}</button><br/>
                <span>{text}</span>
              </span>
          )
        }
      },
      {
        title: '操作',
        render: (product) => (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
        )
      }
    ]
  };

  //异步获取指定页码商品列表显示
  getProducts = async (pageNum) => {
    const {searchName, searchType} = this.state;
    let result;
    //发请求获取数据
    if (!searchName) {
      result = await reqProducts(pageNum, PAGE_SIZE);
    } else {
      result = await reqSearchProducts({ pageNum, pageSize:PAGE_SIZE, searchName, searchType })
    }

    if (result.status===0) {
      //取出数据
      const {total, list} = result.data;
      //更新状态
      this.setState({
        products: list,
        total
      })
    }
  };

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    //获取第一页显示
    this.getProducts(1,)
  }

  render() {

    const {loading, products, total, searchType, searchName} = this.state;

    // Card右上角的结构
    const title = (
        <span>
          <Select
              style={{width: 150}}
              value={searchType}
              onChange={(value) => this.setState({ searchType: value })}
          >
            <Option value="productName">按名称搜索</Option>
            <Option value="productDesc">按描述搜索</Option>
          </Select>
          <Input
              style={{width: 200, margin: '0 10px'}}
              placeholder="关键字"
              value={searchName}
              onChange={ e => this.setState({ searchName: e.target.value })}
          />
          <Button type="primary" onClick={() => this.getProducts()}>搜索</Button>
        </span>
    )
    const extra = (
        <Button type="primary">
          <Icon type="plus"/>
          添加商品
        </Button>
    );

    return (
        <Card title={title} extra={extra}>
          <Table
              columns={this.columns}
              rowKey="_id"
              dataSource={products}
              loading={loading}
              bordered={true}
              pagination={{total, defaultPageSize: PAGE_SIZE, showQuickJumper: true, onChange: this.getProducts}}
          />
        </Card>

    )
  }
};
