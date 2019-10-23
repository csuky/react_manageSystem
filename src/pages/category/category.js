import React, { Component } from 'react'
import {Card, Button, Icon, Table, message, Modal} from "antd";

import {reqCategories, reqAddcategory, reqUpdatecategory} from "../../api";
import LinkButton from "../../components/link-button";
import  AddUpdateForm from "./add-update-form";


/**
 * 分类管理
 */
export default class Category extends Component {

  state = {
    categories: [], //所有分类的数组
    loading: false, //加载状态
    showStatus: 0, //0代表不显示，1代表显示添加，2代表显示修改
  };

  //初始化Table的所有列信息的数组
  initColumns = () => {
    //表格字段配置
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 500,
        render: () => <LinkButton>修改分类</LinkButton>,
      },
    ];
  };

  //异步获取分类列表显示
  getCategories = async () => {
    //显示loading
    this.setState({loading: true});
    //发送异步ajax请求
    const result = await reqCategories();
    //隐藏loading
    this.setState({loading: false});
    if (result.status===0) { //获取成功
      //取出分类列表
      const categories = result.data
      //更新状态categories数据
      this.setState({
        categories
      })
    } else {
      message.error('获取分类列表失败')
    }
  };

  //点击确定的回调：去添加/修改分类
  handleOk = () => {

    //进行表单验证
    this.form.validateFields(async (err, values) => {
      if (!err) {
        //验证通过后，得到输入数据
        const { categoryName } = values
        //发添加分类的请求
        const result = await reqAddcategory(categoryName)
        this.setState({showStatus:0});
        //根据请求响应结果，做不同处理
        if (result.status===0) {
          //重新获取分类列表显示
          this.getCategories()
          message.success('添加分类成功')
        } else {
          message.error('添加分类失败')
        }
      }
    });



  };

  //点击取消的回调
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  };

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getCategories()
  }

  render() {

    //取出状态数据
    const { categories, loading, showStatus } = this.state;

    // Card右上角的结构
    const extra = (
        <Button type="primary" onClick={() => { this.setState({showStatus: 1}) }}>
          <Icon type="plus"/>
          添加
        </Button>
    );

    return (
        <Card extra={extra} >
          <Table
              columns={this.columns}
              rowKey="_id"
              dataSource={categories}
              loading={loading}
              bordered={true}
              pagination={{defaultPageSize: 5, showQuickJumper: true}}
          />
          <Modal
              title={showStatus === 1 ? "添加分类": "修改分类"}
              visible={showStatus !== 0}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
          >
            {/*将子组件传递过来的form对象保存到当前组件对象上*/}
            <AddUpdateForm setForm={form => this.form = form} />
          </Modal>
        </Card>
    )
  }
}
