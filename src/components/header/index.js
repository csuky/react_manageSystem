/**
 * 管理页头部组件
 */
import React, {Component} from 'react'
import { withRouter } from "react-router-dom";


import { Modal } from 'antd'

import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import  menuList from '../../config/menuConfig'
//引入天气接口请求函数
import {reqWeather} from '../../api'


import './index.less'

const { confirm } = Modal;

class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '', //天气图片
        weather: '' //天气文本
    };

    //退出登录
    logout = () => {
        //显示确认提示
        confirm({
            title: '确认退出吗?',
            onOk: () => {
                console.log('OK');
                //确认后，删除存储用户信息：local和memory中
                storageUtils.removeUser()
                memoryUtils.user = {}
                //跳转到登录页面
                this.props.history.replace('/login') //事件里面用这种方式跳转页面
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    //根据当前请求的path得到对应的title
    getTitle = () => {
        let title = '';
        const path = this.props.location.pathname;
        menuList.forEach(item => {
            if (item.key===path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key===path);
                if (cItem) {
                    title = cItem.title
                }
            }
        });

        return title
    };

    //获取天气信息显示
    getWeather = async () => {
        const {dayPictureUrl, weather} = await reqWeather('上海')
        this.setState({
            dayPictureUrl,
            weather
        })
    };

    componentDidMount() {
        //启动循环定时器
        this.intervalId = setInterval(() => {
            //将currentTime更新为当前时间值
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000)

        //发送jsonp请求获取天气信息显示
        this.getWeather()
    }

    componentWillMount() {
        //清除定时器
        clearInterval(this.intervalId)
    }

    render() {

        const user = memoryUtils.user;
        //得到要显示的title
        const title = this.getTitle();
        const {currentTime, dayPictureUrl, weather} = this.state;

        return (
            <div className="header">
                <div className="header-top">
                    欢迎，{user.username} &nbsp;&nbsp;
                    <a href="javascript:" onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);