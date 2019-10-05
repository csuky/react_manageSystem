/**

 * @author Kang Yang

 * @date 2019-09-28 14:12

 */
import React, {Component} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

//引入导航栏路由组件
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

import { Layout } from 'antd'

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
    render() {

        //读取保存的user，如果不存在直接跳转到登录界面
        const user = memoryUtils.user;
        if (!user._id) {
            /*this.props.history.replace('/login')*/ //事件回调函数中使用该方法跳转路由
            return <Redirect to="/login"/>  //跳转到指定路由路径
        }

        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{ background: 'white' }}>
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,0.3)' }}>
                        推荐使用chrome浏览器，效果更佳
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;