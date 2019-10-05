/**
 * 左侧导航栏组件
 */
import React, {Component} from 'react';
import { Link, withRouter } from "react-router-dom";

import { Menu, Icon} from 'antd';

import menuList from '../../config/menuConfig'
import './index.less'
import logo from '../../assets/images/logo.png'

const { SubMenu } = Menu;

class LeftNav extends Component {

    //根据menu数据数组生成<Menu.Item>和<SubMenu>标签数组
    //数组map方法＋函数递归
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
            return ( //有下一级的菜单项
                <SubMenu
                    key={item.key}
                    title={
                        <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                    }
                >
                    {this.getMenuNodes(item.children)}
                </SubMenu>
            )
        })
    };

    //利用数组的reduce方法＋递归生成<Menu.Item>和<SubMenu>标签数组
    getMenuNodes2 = (menuList) => {
        //请求的路径
        const path = this.props.location.pathname;
        return menuList.reduce((pre, item) => {
            if (!item.children) { //可能向pre添加<Menu.Item>
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else { //可能向pre添加<SubMenu>
                /**
                 * 判断当前item的key是否为我所需要的openKey
                 * 查找item的所有children中的cItem的key，是否有一个跟当前请求的path匹配
                 */
                const cItem = item.children.find(cItem => cItem.key===path);
                if (cItem) {
                    this.openKey = item.key
                }

                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes2(item.children)}
                    </SubMenu>
                )
            }

            return pre
        }, [])
    };

    /**
     * 第一次render()之前执行一次
     * 为第一次render()做一些同步的准备工作
     * */
    componentWillMount() {
        //生成导航栏的所有菜单项，这样后续才能取到openKey
        this.menuNodes = this.getMenuNodes2(menuList);
    }

    /**
     * 第一次render()之后执行一次
     * 执行异步任务：如发ajax请求，启动定时器
     * */
    componentDidMount() {
    }

    render() {


        console.log(this.openKey)

        //得到当前请求的路由路径
        const selectKey = this.props.location.pathname;

        return (
            <div className="left-nav">
                <Link className="left-nav-link" to="/home">
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>

                {/*defaultSelectedKeys: 总是根据第一次指定的key进行显示，指定默认值后，通过编码更新为其他值，没有更新效果
                selectedKeys: 总是根据最新指定的key进行显示
                */}
                <Menu
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {/*新方法：根据配置文件自动添加*/}
                    { this.menuNodes }

                    {/*原始方法：手动逐个添加*/}
                    {/*<Menu.Item key="/home">
                        <Link to="/home">
                            <Icon type="home" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="products"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <Link to="/category">
                                <Icon type="home" />
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <Link to="/product">
                                <Icon type="home" />
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>*/}
                </Menu>
            </div>
        );
    }
}

/**
 * 向外暴露 使用高阶组件withRouter()来包装非路由组件
 * 新组件向LeftNav传递3个属于路由组件的属性：history、location、match
 * 结果：非路由组件LeftNav可以操作路由相关语法
 */
export default withRouter(LeftNav);